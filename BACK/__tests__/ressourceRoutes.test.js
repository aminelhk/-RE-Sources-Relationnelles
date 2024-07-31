const {
  getResources,
  createResource,
  deleteResource,
  updateResource,
  findOneResourceById,
  updateArchiveResource,
  updateExploitResource,
  updateFavoriteResource,
  shareResource,
} = require('../controllers/resourceController');

const { PrismaClient } = require('@prisma/client');

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    resource: {
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    share: {
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

const prisma = new PrismaClient(); // This uses the mocked methods

describe('getResources', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of resources with formatted dates', async () => {
    const resources = [
      {
        idResource: '1',
        title: 'Resource 1',
        createdAt: new Date().toISOString(),
        comments: [],
        shares: [],
        author: {},
        categoryResource: {},
        typeResource: {},
      },
    ];
    prisma.resource.findMany.mockResolvedValue(resources);

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getResources(req, res);

    expect(res.json).toHaveBeenCalledWith(
      resources.map(resource => ({
        ...resource,
        createdAt: formatDate(resource.createdAt),
      }))
    );
    expect(prisma.resource.findMany).toHaveBeenCalledWith({
      include: {
        comments: true,
        shares: true,
        author: true,
        categoryResource: true,
        typeResource: true,
      },
    });
  });

  it('should return 500 if an error occurs during retrieval', async () => {
    prisma.resource.findMany.mockRejectedValue(new Error('Internal server error'));

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getResources(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});

describe('createResource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new resource and return it', async () => {
    const resource = {
      title: 'New Resource',
      content: 'Content of the resource',
      isFavorite: false,
      isArchived: false,
      isValidated: false,
      authorId: '1',
      categoryResourceId: '2',
      typeResourceId: '3',
      isPrivate: false,
    };
    prisma.resource.create.mockResolvedValue(resource);

    const req = {
      body: resource,
      file: null,
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost'),
    };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await createResource(req, res);

    expect(res.json).toHaveBeenCalledWith(resource);
    expect(prisma.resource.create).toHaveBeenCalledWith({
      data: resource,
      include: {
        comments: true,
        shares: true,
        author: true,
        categoryResource: true,
        typeResource: true,
      },
    });
  });

  it('should handle file uploads correctly', async () => {
    const resourceWithFile = {
      title: 'Resource with File',
      content: 'File content',
      isFavorite: false,
      isArchived: false,
      isValidated: false,
      authorId: '1',
      categoryResourceId: '2',
      typeResourceId: '3',
      isPrivate: false,
    };
    const req = {
      body: { resource: JSON.stringify(resourceWithFile) },
      file: { filename: 'file.jpg' },
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost'),
    };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await createResource(req, res);

    expect(prisma.resource.create).toHaveBeenCalledWith({
      data: {
        ...resourceWithFile,
        content: 'http://localhost/images/file.jpg',
      },
      include: {
        comments: true,
        shares: true,
        author: true,
        categoryResource: true,
        typeResource: true,
      },
    });
  });

  it('should return 500 if Prisma client throws an error', async () => {
    prisma.resource.create.mockRejectedValue(new Error('Prisma error'));

    const req = { body: { title: 'New Resource' }, file: null };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await createResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});

describe('deleteResource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a resource by id', async () => {
    const resource = { idResource: '123', title: 'Deleted Resource' };
    prisma.resource.delete.mockResolvedValue(resource);

    const req = { body: { idResource: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await deleteResource(req, res);

    expect(res.json).toHaveBeenCalledWith(resource);
    expect(prisma.resource.delete).toHaveBeenCalledWith({
      where: { idResource: '123' },
      include: {
        comments: true,
        shares: true,
        author: true,
        categoryResource: true,
        typeResource: true,
      },
    });
  });

  it('should return 500 if an error occurs during deletion', async () => {
    prisma.resource.delete.mockRejectedValue(new Error('Internal server error'));

    const req = { body: { idResource: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await deleteResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return 400 if idResource is not a string', async () => {
    const req = { body: { idResource: 123 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idResource type' });
  });
});

describe('updateResource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a resource by id', async () => {
    const updatedResource = { idResource: '123', title: 'Updated Resource' };
    prisma.resource.update.mockResolvedValue(updatedResource);

    const req = {
      body: { idResource: '123', title: 'Updated Resource' },
      file: null,
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost'),
    };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateResource(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedResource);
    expect(prisma.resource.update).toHaveBeenCalledWith({
      where: { idResource: '123' },
      data: {
        title: 'Updated Resource',
        content: undefined,
        isFavorite: undefined,
        isArchived: undefined,
        isValidated: undefined,
        authorId: undefined,
        categoryResourceId: undefined,
        typeResourceId: undefined,
      },
      include: {
        comments: true,
        shares: true,
        author: true,
        categoryResource: true,
        typeResource: true,
      },
    });
  });

  it('should handle file uploads correctly', async () => {
    const updatedResourceWithFile = {
      idResource: '123',
      title: 'Updated Resource with File',
      content: 'Updated content',
    };
    const req = {
      body: { resource: JSON.stringify(updatedResourceWithFile) },
      file: { filename: 'updated-file.jpg' },
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost'),
    };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateResource(req, res);

    expect(prisma.resource.update).toHaveBeenCalledWith({
      where: { idResource: '123' },
      data: {
        title: 'Updated Resource with File',
        content: 'http://localhost/images/updated-file.jpg',
      },
      include: {
        comments: true,
        shares: true,
        author: true,
        categoryResource: true,
        typeResource: true,
      },
    });
  });

  it('should return 500 if Prisma client throws an error', async () => {
    prisma.resource.update.mockRejectedValue(new Error('Prisma error'));

    const req = { body: { idResource: '123', title: 'Updated Resource' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return 400 if idResource is not a string', async () => {
    const req = { body: { idResource: 123, title: 'Updated Resource' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid idResource type' });
  });
});

describe('findOneResourceById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find a resource by id', async () => {
    const resource = { idResource: '123', title: 'Resource by ID' };
    prisma.resource.findUnique.mockResolvedValue(resource);

    const req = { body: { idResource: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await findOneResourceById(req, res);

    expect(res.json).toHaveBeenCalledWith(resource);
    expect(prisma.resource.findUnique).toHaveBeenCalledWith({
      where: { idResource: '123' },
      include: {
        comments: true,
        shares: true,
        author: true,
        categoryResource: true,
        typeResource: true,
      },
    });
  });

  it('should return 500 if an error occurs during retrieval', async () => {
    prisma.resource.findUnique.mockRejectedValue(new Error('Internal server error'));

    const req = { body: { idResource: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await findOneResourceById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Une erreur s'est produite lors de la récupération de la ressource." });
  });
});

describe('updateArchiveResource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the archive status of a resource', async () => {
    const resource = { idResource: '123', isArchived: true };
    prisma.resource.update.mockResolvedValue(resource);

    const req = { body: { idResource: '123', isArchived: true } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateArchiveResource(req, res);

    expect(res.json).toHaveBeenCalledWith(resource);
    expect(prisma.resource.update).toHaveBeenCalledWith({
      where: { idResource: '123' },
      data: { isArchived: true },
    });
  });

  it('should return 500 if Prisma client throws an error', async () => {
    prisma.resource.update.mockRejectedValue(new Error('Prisma error'));

    const req = { body: { idResource: '123', isArchived: true } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateArchiveResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return 400 if idResource or isArchived is missing', async () => {
    const req = { body: { isArchived: true } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateArchiveResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing idResource or isArchived' });
  });
});

describe('updateExploitResource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the exploit status of a resource', async () => {
    const resource = { idResource: '123', isExploited: true };
    prisma.resource.update.mockResolvedValue(resource);

    const req = { body: { idResource: '123', isExploited: true } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateExploitResource(req, res);

    expect(res.json).toHaveBeenCalledWith(resource);
    expect(prisma.resource.update).toHaveBeenCalledWith({
      where: { idResource: '123' },
      data: { isExploited: true },
    });
  });

  it('should return 500 if Prisma client throws an error', async () => {
    prisma.resource.update.mockRejectedValue(new Error('Prisma error'));

    const req = { body: { idResource: '123', isExploited: true } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateExploitResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return 400 if idResource or isExploited is missing', async () => {
    const req = { body: { isExploited: true } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateExploitResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing idResource or isExploited' });
  });
});

describe('updateFavoriteResource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the favorite status of a resource', async () => {
    const resource = { idResource: '123', isFavorite: true };
    prisma.resource.update.mockResolvedValue(resource);

    const req = { body: { idResource: '123', isFavorite: true } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateFavoriteResource(req, res);

    expect(res.json).toHaveBeenCalledWith(resource);
    expect(prisma.resource.update).toHaveBeenCalledWith({
      where: { idResource: '123' },
      data: { isFavorite: true },
    });
  });

  it('should return 500 if Prisma client throws an error', async () => {
    prisma.resource.update.mockRejectedValue(new Error('Prisma error'));

    const req = { body: { idResource: '123', isFavorite: true } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateFavoriteResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return 400 if idResource or isFavorite is missing', async () => {
    const req = { body: { isFavorite: true } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await updateFavoriteResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing idResource or isFavorite' });
  });
});

describe('shareResource', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should share a resource and return the share object', async () => {
    const share = { userId: 'user1', resourceId: 'resource1' };
    prisma.share.create.mockResolvedValue(share);

    const req = { body: { userId: 'user1', resourceId: 'resource1' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await shareResource(req, res);

    expect(res.json).toHaveBeenCalledWith(share);
    expect(prisma.share.create).toHaveBeenCalledWith({
      data: { userId: 'user1', resourceId: 'resource1' },
    });
  });

  it('should return 500 if Prisma client throws an error', async () => {
    prisma.share.create.mockRejectedValue(new Error('Prisma error'));

    const req = { body: { userId: 'user1', resourceId: 'resource1' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await shareResource(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Une erreur s'est produite lors du partage de la ressource." });
  });

  it('should return 400 if userId or resourceId is missing', async () => {
    const req = { body: { userId: 'user1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await shareResource(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing userId or resourceId' });
  });
});
