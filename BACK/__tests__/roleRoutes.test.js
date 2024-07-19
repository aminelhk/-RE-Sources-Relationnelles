const { 
    createRole, 
    deleteRole, 
    getRoles, 
    updateRole 
  } = require('../controllers/roleController');
  
  const { PrismaClient } = require('@prisma/client');
  
  // Mock PrismaClient
  jest.mock('@prisma/client', () => {
    const mockPrismaClient = {
      role: {
        create: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
      },
    };
    return { PrismaClient: jest.fn(() => mockPrismaClient) };
  });
  
  const prisma = new PrismaClient(); // This uses the mocked methods
  
  describe('createRole', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
   /* test('returns 400 when idRole or labelRole is missing', async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await createRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing idRole or labelRole' });
    });*/
  
    test('returns 400 when idRole or labelRole is of invalid type', async () => {
      const req = { body: { idRole: 123, labelRole: true } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await createRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idRole or labelRole type' });
    });
  
    test('returns 500 when Prisma client throws an error', async () => {
      const req = { body: { idRole: '1', labelRole: 'Test' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      prisma.role.create.mockRejectedValue(new Error('Prisma error'));
  
      await createRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  
    test('creates a new role when idRole and labelRole are valid', async () => {
      const req = { body: { idRole: '1', labelRole: 'Test' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      prisma.role.create.mockResolvedValue({ idRole: '1', labelRole: 'Test' });
  
      await createRole(req, res);
  
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ idRole: '1', labelRole: 'Test' });
    });
  });
  
  describe('deleteRole', () => {
    let req, res;
  
    beforeEach(() => {
      req = { body: { idRole: '123' } };
      res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete a role by id', async () => {
      const role = { idRole: '123' };
      prisma.role.delete.mockResolvedValue(role);
  
      await deleteRole(req, res);
  
      expect(res.json).toHaveBeenCalledWith(role);
      expect(prisma.role.delete).toHaveBeenCalledWith({ where: { idRole: '123' } });
    });
  
    /*it('should return 400 if idRole is missing', async () => {
      req.body = {}; // No idRole
  
      await deleteRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing idRole' });
    });*/
  
    it('should return 500 if an error occurs during deletion', async () => {
      prisma.role.delete.mockRejectedValue(new Error('Internal server error'));
  
      await deleteRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  
    it('should return 400 if idRole is not a string', async () => {
      req.body = { idRole: 123 }; // Invalid idRole type
  
      await deleteRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idRole type' });
    });
  });
  
  describe('getRoles', () => {
    let req, res;
  
    beforeEach(() => {
      req = {};
      res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return a list of roles', async () => {
      const roles = [{ idRole: '1', labelRole: 'Test1' }, { idRole: '2', labelRole: 'Test2' }];
      prisma.role.findMany.mockResolvedValue(roles);
  
      await getRoles(req, res);
  
      expect(res.json).toHaveBeenCalledWith(roles);
      expect(prisma.role.findMany).toHaveBeenCalled();
    });
  
    it('should return 500 if an error occurs during retrieval', async () => {
      prisma.role.findMany.mockRejectedValue(new Error('Internal server error'));
  
      await getRoles(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
  
  describe('updateRole', () => {
    let req, res;
  
    beforeEach(() => {
      req = { body: { idRole: '123', labelRole: 'Updated Label' } };
      res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update a role by id', async () => {
      const updatedRole = { idRole: '123', labelRole: 'Updated Label' };
      prisma.role.update.mockResolvedValue(updatedRole);
  
      await updateRole(req, res);
  
      expect(res.json).toHaveBeenCalledWith(updatedRole);
      expect(prisma.role.update).toHaveBeenCalledWith({
        where: { idRole: '123' },
        data: { labelRole: 'Updated Label' },
      });
    });
  
    /*it('should return 400 if idRole or labelRole is missing', async () => {
      req.body = { labelRole: 'Updated Label' };
  
      await updateRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing idRole or labelRole' });
    });*/
  
    it('should return 500 if an error occurs during update', async () => {
      prisma.role.update.mockRejectedValue(new Error('Internal server error'));
  
      await updateRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  
    it('should return 400 if idRole is not a string', async () => {
      req.body = { idRole: 123, labelRole: 'Updated Label' };
  
      await updateRole(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idRole or labelRole type' });
    });
  });
  