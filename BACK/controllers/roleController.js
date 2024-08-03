import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createRole = async (req, res) => {
  const { idRole, labelRole } = req.body;

  if (typeof idRole !== 'string' || typeof labelRole !== 'string') {
    return res.status(400).json({ error: 'Invalid idRole or labelRole type' });
  }

  try {
    const role = await prisma.role.create({
      data: { idRole, labelRole },
    });
    res.json(role);
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteRole = async (req, res) => {
  const { idRole } = req.body;

  if (typeof idRole !== 'string') {
    return res.status(400).json({ error: 'Invalid idRole type' });
  }

  try {
    const role = await prisma.role.delete({ where: { idRole: idRole } });
    res.json(role);
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateRole = async (req, res) => {
  const { idRole, labelRole } = req.body;

  if (typeof idRole !== 'string' || typeof labelRole !== 'string') {
    return res.status(400).json({ error: 'Invalid idRole or labelRole type' });
  }

  try {
    const role = await prisma.role.update({
      where: { idRole: idRole },
      data: { labelRole },
    });
    res.json(role);
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
