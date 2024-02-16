import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getCategoryResources = async (req, res) => {
  const categoryResources = await prisma.categoryResource.findMany();
  res.json(categoryResources);
};

exports.addCategoryResource = async (req, res) => {
  const { labelCategoryResource } = req.body;
  const categoryResource = await prisma.categoryResource.create({
    data: { labelCategoryResource },
  });
  res.json(categoryResource);
};

exports.deleteCategoryResource = async (req, res) => {
  const { idCategoryResource } = req.body;
  const categoryResource = await prisma.categoryResource.delete({
    where: { idCategoryResource: idCategoryResource },
  });
  res.json(categoryResource);
};

exports.updateCategoryResource = async (req, res) => {
  const { idCategoryResource, labelCategoryResource } = req.body;
  const categoryResource = await prisma.categoryResource.update({
    where: { idCategoryResource: idCategoryResource },
    data: {
      labelCategoryResource,
    },
  });
  res.json(categoryResource);
};
