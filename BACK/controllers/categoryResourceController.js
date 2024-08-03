const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCategoriesResource = async (req, res) => {
  try {
    const categoriesResources = await prisma.categoryResource.findMany();
    res.json(categoriesResources);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createCategoryResource = async (req, res) => {
  const { labelCategoryResource } = req.body;

  if (!labelCategoryResource) {
    return res.status(400).json({ error: 'Missing labelCategoryResource' });
  }

  if (typeof labelCategoryResource !== 'string') {
    return res.status(400).json({ error: 'Invalid labelCategoryResource type' });
  }

  try {
    const categoryResource = await prisma.categoryResource.create({
      data: { labelCategoryResource },
    });
    res.json(categoryResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCategoryResource = async (req, res) => {
  const { idCategoryResource } = req.body;

  if (!idCategoryResource) {
    return res.status(400).json({ error: 'Missing idCategoryResource' });
  }

  if (typeof idCategoryResource !== 'string') {
    return res.status(400).json({ error: 'Invalid idCategoryResource type' });
  }

  try {
    const categoryResource = await prisma.categoryResource.delete({
      where: { idCategoryResource: idCategoryResource },
    });
    res.json(categoryResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCategoryResource = async (req, res) => {
  const { idCategoryResource, labelCategoryResource } = req.body;
  if (!idCategoryResource || !labelCategoryResource) {
    return res.status(400).json({ error: 'Missing idCategoryResource or labelCategoryResource' });
  }
  if (typeof idCategoryResource !== 'string') {
    return res.status(400).json({ error: 'Invalid idCategoryResource type' });
  }
  try {
    const categoryResource = await prisma.categoryResource.update({
      where: { idCategoryResource: idCategoryResource },
      data: { labelCategoryResource },
    });
    res.json(categoryResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
