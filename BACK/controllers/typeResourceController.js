import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getTypeResources = async (req, res) => {
  const typeResources = await prisma.typeResource.findMany();
  res.json(typeResources);
};

exports.addTypeResource = async (req, res) => {
  const { labelTypeResource } = req.body;
  const typeResource = await prisma.typeResource.create({
    data: {
      labelTypeResource,
    },
  });
  res.json(typeResource);
};

exports.deleteTypeResource = async (req, res) => {
  const { idTypeResource } = req.body;
  const typeResource = await prisma.typeResource.delete({
    where: { idTypeResource: idTypeResource },
  });
  res.json(typeResource);
};

exports.updateTypeResource = async (req, res) => {
  const { idTypeResource, labelTypeResource } = req.body;
  const typeResource = await prisma.typeResource.update({
    where: { idTypeResource: idTypeResource },
    data: {
      labelTypeResource,
    },
  });
  res.json(typeResource);
};
