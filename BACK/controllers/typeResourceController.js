import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getTypesResource = async (req, res) => {
  try {
    const typesResource = await prisma.typeResource.findMany();
    res.json(typesResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTypeResource = async (req, res) => {
  const { labelTypeResource } = req.body;

  if (labelTypeResource === undefined) {
    return res.status(400).json({ error: 'Missing labelTypeResource' });
  }

  if (typeof labelTypeResource !== 'string') {
    return res.status(400).json({ error: 'Invalid labelTypeResource type' });
  }

  try {
    const typeResource = await prisma.typeResource.create({
      data: { labelTypeResource },
    });
    res.json(typeResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTypeResource = async (req, res) => {
  const { idTypeResource } = req.body;

  if (idTypeResource === undefined) {
    return res.status(400).json({ error: 'Missing idTypeResource' });
  }

  if (typeof idTypeResource !== 'string') {
    return res.status(400).json({ error: 'Invalid idTypeResource type' });
  }

  try {
    const typeResource = await prisma.typeResource.delete({
      where: { idTypeResource },
    });
    res.json(typeResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTypeResource = async (req, res) => {
  const { idTypeResource, labelTypeResource } = req.body;

  if (idTypeResource === undefined || labelTypeResource === undefined) {
    return res.status(400).json({ error: 'Missing idTypeResource or labelTypeResource' });
  }

  if (typeof idTypeResource !== 'string' || typeof labelTypeResource !== 'string') {
    return res.status(400).json({ error: 'Invalid idTypeResource or labelTypeResource type' });
  }

  try {
    const typeResource = await prisma.typeResource.update({
      where: { idTypeResource },
      data: { labelTypeResource },
    });
    res.json(typeResource);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
