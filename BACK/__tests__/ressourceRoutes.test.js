const { PrismaClient } = require('@prisma/client');
const { getResources, 
        createResource, 
        deleteResource, 
        updateResource, 
        findOneResourceById,
        updateArchiveResource, 
        updateExploitResource, 
        updateFavoriteResource, 
        shareResource } = require('../controllers/resourceController');

jest.mock('@prisma/client');

const mockPrisma = {
  resource: {
    findMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
  },
};

PrismaClient.mockImplementation(() => mockPrisma);

describe('resourceController', () => {
  let req, res;

  beforeEach(() => {
    req = { 
      body: { resource: JSON.stringify({ title: 'Test Resource' }) }, 
      file: { filename: 'test.jpg' },
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost:3000')
    };
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getResources', () => {
    it('should return a list of resources', async () => {
      const resources = [{ idResource: '123', title: 'Resource 1' }];
      mockPrisma.resource.findMany.mockResolvedValue(resources);

      await getResources(req, res);

      expect(res.json).toHaveBeenCalledWith(resources);
    });

    it('should return 500 if an error occurs during retrieval', async () => {
      mockPrisma.resource.findMany.mockRejectedValue(new Error('Internal server error'));

      await getResources(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Une erreur s'est produite lors de la récupération des ressources." });
    });
  });

  describe('createResource', () => {
    it('should create a new resource', async () => {
      const newResource = { idResource: '123', title: 'Test Resource', content: 'http://localhost:3000/images/test.jpg' };
      mockPrisma.resource.create.mockResolvedValue(newResource);

      await createResource(req, res);

      expect(res.json).toHaveBeenCalledWith(newResource);
    });

    it('should return 500 if an error occurs during creation', async () => {
      mockPrisma.resource.create.mockRejectedValue(new Error('Internal server error'));

      await createResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Une erreur s'est produite lors de la création de la ressource." });
    });
  });

  describe('deleteResource', () => {
    it('should delete a resource by id', async () => {
      const resource = { idResource: '123' };
      mockPrisma.resource.delete.mockResolvedValue(resource);

      await deleteResource(req, res);

      expect(res.json).toHaveBeenCalledWith(resource);
      expect(mockPrisma.resource.delete).toHaveBeenCalledWith({ 
        where: { idResource: '123' },
        include: { author: true, categoryResource: true, comments: true, shares: true, typeResource: true }
      });
    });

    it('should return 500 if an error occurs during deletion', async () => {
      mockPrisma.resource.delete.mockRejectedValue(new Error('Internal server error'));

      await deleteResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateResource', () => {
    it('should update a resource by id', async () => {
      const updatedResource = { idResource: '123', title: 'Updated Title' };
      mockPrisma.resource.update.mockResolvedValue(updatedResource);

      await updateResource(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedResource);
      expect(mockPrisma.resource.update).toHaveBeenCalledWith({
        where: { idResource: '123' },
        data: { title: 'Updated Title' },
        include: { author: true, categoryResource: true, comments: true, shares: true, typeResource: true }
      });
    });

    it('should return 500 if an error occurs during update', async () => {
      mockPrisma.resource.update.mockRejectedValue(new Error('Internal server error'));

      await updateResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('findOneResourceById', () => {
    it('should return a resource by id', async () => {
      const resource = { idResource: '123', title: 'Test Resource' };
      mockPrisma.resource.findUnique.mockResolvedValue(resource);

      await findOneResourceById(req, res);

      expect(res.json).toHaveBeenCalledWith(resource);
      expect(mockPrisma.resource.findUnique).toHaveBeenCalledWith({
        where: { idResource: '123' },
        include: { author: true, categoryResource: true, comments: true, shares: true, typeResource: true }
      });
    });

    it('should return 500 if an error occurs during retrieval', async () => {
      mockPrisma.resource.findUnique.mockRejectedValue(new Error('Internal server error'));

      await findOneResourceById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Une erreur s'est produite lors de la récupération de la ressource." });
    });
  });

  describe('updateArchiveResource', () => {
    it('should update isArchived field of a resource by id', async () => {
      const updatedResource = { idResource: '123', isArchived: true };
      mockPrisma.resource.update.mockResolvedValue(updatedResource);

      await updateArchiveResource(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedResource);
      expect(mockPrisma.resource.update).toHaveBeenCalledWith({
        where: { idResource: '123' },
        data: { isArchived: true },
        include: { author: true, categoryResource: true, comments: true, shares: true, typeResource: true }
      });
    });

    it('should return 500 if an error occurs during update', async () => {
      mockPrisma.resource.update.mockRejectedValue(new Error('Internal server error'));

      await updateArchiveResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateExploitResource', () => {
    it('should update isExploited field of a resource by id', async () => {
      const updatedResource = { idResource: '123', isExploited: true };
      mockPrisma.resource.update.mockResolvedValue(updatedResource);

      await updateExploitResource(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedResource);
      expect(mockPrisma.resource.update).toHaveBeenCalledWith({
        where: { idResource: '123' },
        data: { isExploited: true },
        include: { author: true, categoryResource: true, comments: true, shares: true, typeResource: true }
      });
    });

    it('should return 500 if an error occurs during update', async () => {
      mockPrisma.resource.update.mockRejectedValue(new Error('Internal server error'));

      await updateExploitResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('updateFavoriteResource', () => {
    it('should update isFavorite field of a resource by id', async () => {
      const updatedResource = { idResource: '123', isFavorite: true };
      mockPrisma.resource.update.mockResolvedValue(updatedResource);

      await updateFavoriteResource(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedResource);
      expect(mockPrisma.resource.update).toHaveBeenCalledWith({
        where: { idResource: '123' },
        data: { isFavorite: true },
        include: { author: true, categoryResource: true, comments: true, shares: true, typeResource: true }
      });
    });

    it('should return 500 if an error occurs during update', async () => {
      mockPrisma.resource.update.mockRejectedValue(new Error('Internal server error'));

      await updateFavoriteResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Une erreur s'est produite lors du partage de la ressource." });
    });
  });

  describe('shareResource', () => {
    it('should update shares of a resource by id', async () => {
      const updatedResource = { idResource: '123', shares: [{ userId: '456' }] };
      mockPrisma.resource.update.mockResolvedValue(updatedResource);
  
      await shareResource(req, res);
  
      expect(res.json).toHaveBeenCalledWith(updatedResource);
      expect(mockPrisma.resource.update).toHaveBeenCalledWith({
        where: { idResource: '123' },
        data: { shares: { connect: { userId: '456' } } },
        include: { author: true, categoryResource: true, comments: true, shares: true, typeResource: true }
      });
    });
  
    it('should return 500 if an error occurs during update', async () => {
      mockPrisma.resource.update.mockRejectedValue(new Error('Internal server error'));
  
      await shareResource(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Une erreur s'est produite lors du partage de la ressource." });
    });
  });
  
});
