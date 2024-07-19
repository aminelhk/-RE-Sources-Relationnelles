import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, deleteUser, updateUser, getUsers, getUserById, loginUser, logoutUser } from "../controllers/userController";

jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    user: {
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

const prisma = new PrismaClient();
const secretKey = "test_secret"; // Use a test secret key

describe('createUser', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('creates a user and hashes the password', async () => {
      const req = { body: { email: 'test@example.com', password: 'password', firstName: 'John', lastName: 'Doe' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
      bcrypt.hash = jest.fn().mockResolvedValue('hashed_password');
      prisma.user.create.mockResolvedValue({ id: 1, ...req.body, password: 'hashed_password' });
  
      await createUser(req, res);
  
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body, password: 'hashed_password' });
    });
  });

  describe('deleteUser', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('deletes a user by id', async () => {
      const req = { body: { idUser: '123' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
      prisma.user.delete.mockResolvedValue({ idUser: '123' });
  
      await deleteUser(req, res);
  
      expect(res.json).toHaveBeenCalledWith({ idUser: '123' });
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { idUser: '123' } });
    });
  });

  describe('updateUser', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('updates a user and hashes the new password', async () => {
      const req = { body: { idUser: '123', email: 'test@example.com', password: 'new_password' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
      bcrypt.hash = jest.fn().mockResolvedValue('hashed_new_password');
      prisma.user.update.mockResolvedValue({ idUser: '123', email: 'test@example.com', password: 'hashed_new_password' });
  
      await updateUser(req, res);
  
      expect(bcrypt.hash).toHaveBeenCalledWith('new_password', 10);
      expect(res.json).toHaveBeenCalledWith({ idUser: '123', email: 'test@example.com', password: 'hashed_new_password' });
    });
  
    it('does not hash the password if it is not provided', async () => {
      const req = { body: { idUser: '123', email: 'test@example.com' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
      prisma.user.update.mockResolvedValue({ idUser: '123', email: 'test@example.com' });
  
      await updateUser(req, res);
  
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ idUser: '123', email: 'test@example.com' });
    });
  });

  describe('getUsers', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('returns a list of users', async () => {
      const req = {};
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const users = [{ idUser: '1', email: 'test1@example.com' }, { idUser: '2', email: 'test2@example.com' }];
  
      prisma.user.findMany.mockResolvedValue(users);
  
      await getUsers(req, res);
  
      expect(res.json).toHaveBeenCalledWith(users);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('returns a user by id', async () => {
      const req = { body: { idUser: '123' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const user = { idUser: '123', email: 'test@example.com' };
  
      prisma.user.findUnique.mockResolvedValue(user);
  
      await getUserById(req, res);
  
      expect(res.json).toHaveBeenCalledWith(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { idUser: '123' }, include: { role: true } });
    });
  
    it('returns 500 if an error occurs', async () => {
      const req = { body: { idUser: '123' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
      prisma.user.findUnique.mockRejectedValue(new Error('Internal server error'));
  
      await getUserById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Une erreur s'est produite lors de la récupération de l'utilisateur.",
      });
    });
  });

  describe('logoutUser', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('logs out a user by clearing the token cookie', async () => {
      const req = {};
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), clearCookie: jest.fn() };
  
      await logoutUser(req, res);
  
      expect(res.clearCookie).toHaveBeenCalledWith('token');
      expect(res.json).toHaveBeenCalledWith({ message: "Déconnexion réussie" });
    });
  
    it('returns 500 if an error occurs during logout', async () => {
      const req = {};
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
      res.clearCookie = jest.fn().mockImplementation(() => { throw new Error('Clear cookie error'); });
  
      await logoutUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Impossible de déconnecter l'utilisateur" });
    });
  });
  