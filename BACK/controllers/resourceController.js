import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getResources = async (req, res) => {
  const resources = await prisma.resource.findMany();
  res.json(resources);
};

exports.addResource = async (req, res) => {
  const {
    title,
    content,
    isFavorite,
    isArchived,
    isValidated,
    authorId,
    categoryResourceId,
    typeResourceId,
  } = req.body;
  const resource = await prisma.resource.create({
    data: {
      title,
      content,
      isFavorite,
      isArchived,
      isValidated,
      authorId,
      categoryResourceId,
      typeResourceId,
    },
  });
  res.json(resource);
};

exports.deleteResource = async (req, res) => {
  const { idResource } = req.body;
  const resource = await prisma.resource.delete({
    where: { idResource: idResource },
  });
  res.json(resource);
};

exports.updateResource = async (req, res) => {
  const {
    idResource,
    title,
    content,
    isFavorite,
    isArchived,
    isValidated,
    authorId,
    categoryResourceId,
    typeResourceId,
  } = req.body;
  const resource = await prisma.resource.update({
    where: { idResource: idResource },
    data: {
      title,
      content,
      isFavorite,
      isArchived,
      isValidated,
      authorId,
      categoryResourceId,
      typeResourceId,
    },
  });
  res.json(resource);
};
