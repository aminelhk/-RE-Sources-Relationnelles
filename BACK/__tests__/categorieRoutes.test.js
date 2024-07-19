const { 
  createCategoryResource, 
  deleteCategoryResource, 
  getCategoriesResource, 
  updateCategoryResource 
} = require('../controllers/categoryResourceController');

const { PrismaClient } = require('@prisma/client');

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    categoryResource: {
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

const prisma = new PrismaClient(); // This uses the mocked methods

describe('createCategoryResource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns 400 when labelCategoryResource is a number', async () => {
    const req = {
      body: {
        labelCategoryResource: 123,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid labelCategoryResource type' });
  });

  test('returns 400 when labelCategoryResource is a boolean', async () => {
    const req = {
      body: {
        labelCategoryResource: true,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid labelCategoryResource type' });
  });

  test('returns 400 when labelCategoryResource is missing', async () => {
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing labelCategoryResource' });
  });

  test('returns 500 when Prisma client throws an error', async () => {
    const req = {
      body: {
        labelCategoryResource: 'Test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    prisma.categoryResource.create.mockRejectedValue(new Error('Prisma error'));

    await createCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  test('creates a new category resource when labelCategoryResource is valid', async () => {
    const req = {
      body: {
        labelCategoryResource: 'Test',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    prisma.categoryResource.create.mockResolvedValue({
      id: 1,
      labelCategoryResource: 'Test',
    });

    await createCategoryResource(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      labelCategoryResource: 'Test',
    });
  });
});

describe('deleteCategoryResource', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { idCategoryResource: '123' } };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a category resource by id', async () => {
    const categoryResource = { idCategoryResource: '123' };
    prisma.categoryResource.delete.mockResolvedValue(categoryResource);

    await deleteCategoryResource(req, res);

    expect(res.json).toHaveBeenCalledWith(categoryResource);
    expect(prisma.categoryResource.delete).toHaveBeenCalledWith({ where: { idCategoryResource: '123' } });
  });

  it('should return 400 if idCategoryResource is missing', async () => {
    req.body = {}; // No idCategoryResource

    await deleteCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing idCategoryResource' });
  });

  it('should return 500 if an error occurs during deletion', async () => {
    prisma.categoryResource.delete.mockRejectedValue(new Error('Internal server error'));

    await deleteCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return 400 if idCategoryResource is not a string', async () => {
    req.body = { idCategoryResource: 123 }; // Invalid idCategoryResource type

    await deleteCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idCategoryResource type' });
  });
});

describe('getCategoriesResource', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of category resources', async () => {
    const categories = [{ id: 1, labelCategoryResource: 'Test1' }, { id: 2, labelCategoryResource: 'Test2' }];
    prisma.categoryResource.findMany.mockResolvedValue(categories);

    await getCategoriesResource(req, res);

    expect(res.json).toHaveBeenCalledWith(categories);
    expect(prisma.categoryResource.findMany).toHaveBeenCalled();
  });

  it('should return 500 if an error occurs during retrieval', async () => {
    prisma.categoryResource.findMany.mockRejectedValue(new Error('Internal server error'));

    await getCategoriesResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});

describe('updateCategoryResource', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { idCategoryResource: '123', labelCategoryResource: 'Updated Label' } };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a category resource by id', async () => {
    const updatedCategory = { idCategoryResource: '123', labelCategoryResource: 'Updated Label' };
    prisma.categoryResource.update.mockResolvedValue(updatedCategory);

    await updateCategoryResource(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedCategory);
    expect(prisma.categoryResource.update).toHaveBeenCalledWith({
      where: { idCategoryResource: '123' },
      data: { labelCategoryResource: 'Updated Label' },
    });
  });

  it('should return 400 if idCategoryResource or labelCategoryResource is missing', async () => {
    req.body = { labelCategoryResource: 'Updated Label' };

    await updateCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing idCategoryResource or labelCategoryResource' });
  });

  it('should return 500 if an error occurs during update', async () => {
    prisma.categoryResource.update.mockRejectedValue(new Error('Internal server error'));

    await updateCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return 400 if idCategoryResource is not a string', async () => {
    req.body = { idCategoryResource: 123, labelCategoryResource: 'Updated Label' };

    await updateCategoryResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idCategoryResource type' });
  });
});
