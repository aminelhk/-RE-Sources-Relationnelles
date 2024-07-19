const { 
    createTypeResource, 
    deleteTypeResource, 
    getTypesResource, 
    updateTypeResource 
  } = require('../controllers/typeResourceController');
  
  const { PrismaClient } = require('@prisma/client');
  
  // Mock PrismaClient
  jest.mock('@prisma/client', () => {
    const mockPrismaClient = {
      typeResource: {
        create: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
      },
    };
    return { PrismaClient: jest.fn(() => mockPrismaClient) };
  });
  
  const prisma = new PrismaClient(); // This uses the mocked methods
  
  describe('createTypeResource', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('returns 400 when labelTypeResource is a number', async () => {
      const req = { body: { labelTypeResource: 123 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await createTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid labelTypeResource type' });
    });
  
    test('returns 400 when labelTypeResource is a boolean', async () => {
      const req = { body: { labelTypeResource: true } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await createTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid labelTypeResource type' });
    });
  
    test('returns 400 when labelTypeResource is missing', async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await createTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing labelTypeResource' });
    });
  
    test('returns 500 when Prisma client throws an error', async () => {
      const req = { body: { labelTypeResource: 'Test' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      prisma.typeResource.create.mockRejectedValue(new Error('Prisma error'));
  
      await createTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  
    test('creates a new type resource when labelTypeResource is valid', async () => {
      const req = { body: { labelTypeResource: 'Test' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      prisma.typeResource.create.mockResolvedValue({ id: 1, labelTypeResource: 'Test' });
  
      await createTypeResource(req, res);
  
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ id: 1, labelTypeResource: 'Test' });
    });
  });
  
  describe('deleteTypeResource', () => {
    let req, res;
  
    beforeEach(() => {
      req = { body: { idTypeResource: '123' } };
      res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete a type resource by id', async () => {
      const typeResource = { idTypeResource: '123' };
      prisma.typeResource.delete.mockResolvedValue(typeResource);
  
      await deleteTypeResource(req, res);
  
      expect(res.json).toHaveBeenCalledWith(typeResource);
      expect(prisma.typeResource.delete).toHaveBeenCalledWith({ where: { idTypeResource: '123' } });
    });
  
    it('should return 400 if idTypeResource is missing', async () => {
      req.body = {}; // No idTypeResource
  
      await deleteTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing idTypeResource' });
    });
  
    it('should return 500 if an error occurs during deletion', async () => {
      prisma.typeResource.delete.mockRejectedValue(new Error('Internal server error'));
  
      await deleteTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  
    it('should return 400 if idTypeResource is not a string', async () => {
      req.body = { idTypeResource: 123 }; // Invalid idTypeResource type
  
      await deleteTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idTypeResource type' });
    });
  });
  
  describe('getTypesResource', () => {
    let req, res;
  
    beforeEach(() => {
      req = {};
      res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return a list of type resources', async () => {
      const types = [{ id: 1, labelTypeResource: 'Test1' }, { id: 2, labelTypeResource: 'Test2' }];
      prisma.typeResource.findMany.mockResolvedValue(types);
  
      await getTypesResource(req, res);
  
      expect(res.json).toHaveBeenCalledWith(types);
      expect(prisma.typeResource.findMany).toHaveBeenCalled();
    });
  
    it('should return 500 if an error occurs during retrieval', async () => {
      prisma.typeResource.findMany.mockRejectedValue(new Error('Internal server error'));
  
      await getTypesResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
  
  describe('updateTypeResource', () => {
    let req, res;
  
    beforeEach(() => {
      req = { body: { idTypeResource: '123', labelTypeResource: 'Updated Label' } };
      res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update a type resource by id', async () => {
      const updatedTypeResource = { idTypeResource: '123', labelTypeResource: 'Updated Label' };
      prisma.typeResource.update.mockResolvedValue(updatedTypeResource);
  
      await updateTypeResource(req, res);
  
      expect(res.json).toHaveBeenCalledWith(updatedTypeResource);
      expect(prisma.typeResource.update).toHaveBeenCalledWith({
        where: { idTypeResource: '123' },
        data: { labelTypeResource: 'Updated Label' },
      });
    });
  
    it('should return 400 if idTypeResource or labelTypeResource is missing', async () => {
      req.body = { labelTypeResource: 'Updated Label' };
  
      await updateTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing idTypeResource or labelTypeResource' });
    });
  
    it('should return 500 if an error occurs during update', async () => {
      prisma.typeResource.update.mockRejectedValue(new Error('Internal server error'));
  
      await updateTypeResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  
    it('should return 400 if idTypeResource is not a string', async () => {
        req.body = { idTypeResource: 123, labelTypeResource: 'Updated Label' };
    
        await updateTypeResource(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idTypeResource or labelTypeResource type' });
      });
  });
  