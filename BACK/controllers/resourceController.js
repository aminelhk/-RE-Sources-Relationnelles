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
      email,
      firstName,
      lastName,
      phone,
      password,
      pseudo,
      isActive,
      isPrivet,
      vitalCardNumber,
      roleId,
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
    email,
    firstName,
    lastName,
    phone,
    password,
    pseudo,
    isActive,
    isPrivet,
    vitalCardNumber,
    roleId,
  } = req.body;
  const resource = await prisma.resource.update({
    where: { idResource: idResource },
    data: {
      email,
      firstName,
      lastName,
      phone,
      password,
      pseudo,
      isActive,
      isPrivet,
      vitalCardNumber,
      roleId,
    },
  });
  res.json(resource);
};
