import request from 'supertest';
import express from 'express';
import categoryResourceRoutes from '../routes/categoryResourceRoutes';

// Mock Prisma Client
import { PrismaClient } from '@prisma/client';
jest.mock('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use('/categories', categoryResourceRoutes);

describe('Category Resource Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /categories should return list of categories', async () => {
    const mockCategories = [{ id: 1, labelCategoryResource: 'Category 1' }];
    prisma.categoryResource.findMany.mockResolvedValue(mockCategories);

    const response = await request(app).get('/categories');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategories);
  });

  test('POST /categories/createCategoryResource should create a new category', async () => {
    const mockCategory = { id: 1, labelCategoryResource: 'New Category' };
    prisma.categoryResource.create.mockResolvedValue(mockCategory);

    const response = await request(app)
      .post('/categories/createCategoryResource')
      .send({ labelCategoryResource: 'New Category' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
  });

  test('DELETE /categories/deleteCategoryResource should delete a category', async () => {
    const mockCategory = { id: 1, labelCategoryResource: 'Category 1' };
    prisma.categoryResource.delete.mockResolvedValue(mockCategory);

    const response = await request(app)
      .delete('/categories/deleteCategoryResource')
      .send({ idCategoryResource: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
  });

  test('PUT /categories/updateCategoryResource should update a category', async () => {
    const mockCategory = { id: 1, labelCategoryResource: 'Updated Category' };
    prisma.categoryResource.update.mockResolvedValue(mockCategory);

    const response = await request(app)
      .put('/categories/updateCategoryResource')
      .send({ idCategoryResource: 1, labelCategoryResource: 'Updated Category' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
  });
});
