const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

// Mock Prisma client
jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    resource: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    share: {
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

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

// Define routes
app.get('/resources', getResources);
app.post('/resources', createResource);
app.delete('/resources', deleteResource);
app.put('/resources', updateResource);
app.get('/resources/:id', findOneResourceById);
app.patch('/resources/archive', updateArchiveResource);
app.patch('/resources/exploit', updateExploitResource);
app.patch('/resources/favorite', updateFavoriteResource);
app.post('/resources/share', shareResource);

describe('Resource Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    
      afterAll(async () => {
        prisma.$disconnect;
      });

  it('should fetch resources', async () => {
    prisma.resource.findMany.mockResolvedValue([{ id: 1, title: 'Test Resource' }]);
    const res = await request(app).get('/resources');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ createdAt: { date: "NaN/NaN/NaN", heure: "NaN:NaN:NaN" }, id: 1, title: 'Test Resource' }]);
  });

  it('should create a resource', async () => {
    const newResource = { id: 1, title: 'New Resource' };
    prisma.resource.create.mockResolvedValue(newResource);
    const res = await request(app).post('/resources').send({
      title: 'New Resource',
      content: 'Resource Content',
      isFavorite: false,
      isArchived: false,
      authorId: 1,
      categoryResourceId: 1,
      typeResourceId: 1,
      isPrivate: false,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(newResource);
  });

  it('should return 400 if creating resource with invalid data', async () => {
    const res = await request(app).post('/resources').send({
      title: 'New Resource'
      // missing required fields
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should delete a resource', async () => {
    const deletedResource = { id: 1, title: 'Deleted Resource' };
    prisma.resource.delete.mockResolvedValue(deletedResource);
    const res = await request(app).delete('/resources').send({ idResource: 1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(deletedResource);
  });

  it('should return 400 if deleting resource with invalid data', async () => {
    const res = await request(app).delete('/resources').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should update a resource', async () => {
    const updatedResource = { id: 1, title: 'Updated Resource' };
    prisma.resource.update.mockResolvedValue(updatedResource);
    const res = await request(app).put('/resources').send({
      idResource: 1,
      title: 'Updated Resource',
      content: 'Updated Content',
      isFavorite: false,
      isArchived: false,
      isValidated: true,
      authorId: 1,
      categoryResourceId: 1,
      typeResourceId: 1,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedResource);
  }, 10000); 

  it('should return 400 if updating resource with invalid data', async () => {
    const res = await request(app).put('/resources').send({
      idResource: 1,
      title: 'Updated Resource',
      // missing required fields
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fetch a resource by ID', async () => {
    const resource = { id: 1, title: 'Resource by ID' };
    prisma.resource.create.mockResolvedValue(resource);
    prisma.resource.findUnique.mockResolvedValue(resource);
    const res = await request(app).get('/resources/1');
    expect(res.body).toEqual(resource);
    expect(res.statusCode).toEqual(200);
  });

  it('should return 404 if resource by ID not found', async () => {
    prisma.resource.findUnique.mockResolvedValue(null);
    const res = await request(app).get('/resources/1');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should update archive status', async () => {
    const updatedResource = { id: 1, isArchived: true };
    prisma.resource.update.mockResolvedValue(updatedResource);
    const res = await request(app).patch('/resources/archive').send({ idResource: 1, isArchived: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedResource);
  });

  it('should return 400 if updating archive status with invalid data', async () => {
    const res = await request(app).patch('/resources/archive').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should update exploit status', async () => {
    const updatedResource = { id: 1, isExploited: true };
    prisma.resource.update.mockResolvedValue(updatedResource);
    const res = await request(app).patch('/resources/exploit').send({ idResource: 1, isExploited: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedResource);
  });

  it('should return 400 if updating exploit status with invalid data', async () => {
    const res = await request(app).patch('/resources/exploit').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should update favorite status', async () => {
    const updatedResource = { id: 1, isFavorite: true };
    prisma.resource.update.mockResolvedValue(updatedResource);
    const res = await request(app).patch('/resources/favorite').send({ idResource: 1, isFavorite: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedResource);
  });

  it('should return 400 if updating favorite status with invalid data', async () => {
    const res = await request(app).patch('/resources/favorite').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should share a resource', async () => {
    const share = { id: 1, userId: 1, resourceId: 1 };
    prisma.share.create.mockResolvedValue(share);
    const res = await request(app).post('/resources/share').send({ userId: 1, resourceId: 1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(share);
  });

  it('should return 500 if sharing resource fails', async () => {
    prisma.share.create.mockRejectedValue(new Error('Internal Server Error'));
    const res = await request(app).post('/resources/share').send({ userId: 1, resourceId: 1 });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'An error occurred while sharing the resource.');
  });
});
