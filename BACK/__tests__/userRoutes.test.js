// __tests__/userRoutes.test.js
import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of users', async () => {
    const mockUsers = [
      { idUser: 1, email: 'test1@example.com' },
      { idUser: 2, email: 'test2@example.com' },
    ];
    prisma.user.findMany.mockResolvedValue(mockUsers);

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('should create a new user', async () => {
    const mockUser = { idUser: 3, email: 'test3@example.com' };
    prisma.user.create.mockResolvedValue(mockUser);
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

    const response = await request(app)
      .post('/users/createUser')
      .send({
        email: 'test3@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        password: 'password',
        pseudo: 'johndoe',
        isActive: true,
        isPrivate: false,
        vitalCardNumber: '123456',
        roleId: 1,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should delete a user', async () => {
    const mockUser = { idUser: 1, email: 'test1@example.com' };
    prisma.user.delete.mockResolvedValue(mockUser);

    const response = await request(app)
      .delete('/users/deleteUser')
      .send({ idUser: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const mockUser = { idUser: 2, email: 'updated@example.com' };
    prisma.user.update.mockResolvedValue(mockUser);
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

    const response = await request(app)
      .put('/users/updateUser')
      .send({
        idUser: 2,
        email: 'updated@example.com',
        firstName: 'Updated',
        lastName: 'User',
        phone: '0987654321',
        password: 'password',
        pseudo: 'updateduser',
        isActive: true,
        isPrivet: false,
        vitalCardNumber: '654321',
        roleId: 2,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should return a user by ID', async () => {
    const mockUser = { idUser: 1, email: 'test1@example.com' };
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/users/getUserById')
      .send({ idUser: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should log in a user', async () => {
    const mockUser = { idUser: 1, email: 'test1@example.com', password: 'hashedPassword', isActive: true };
    prisma.user.findFirst.mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    jwt.sign = jest.fn().mockReturnValue('mockToken');

    const response = await request(app)
      .post('/users/login')
      .send({ email: 'test1@example.com', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: 'mockToken' });
  });

  it('should log out a user', async () => {
    const response = await request(app)
      .post('/users/logout');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Déconnexion réussie' });
  });
});
