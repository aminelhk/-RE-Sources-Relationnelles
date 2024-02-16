import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getRoles = async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
};

exports.createRole = async (req, res) => {
  const { idRole, labelRole } = req.body;
  const role = await prisma.role.create({
    data: { idRole, labelRole },
  });
  res.json(role);
};

exports.deleteRole = async (req, res) => {
  const { idRole } = req.body;
  const role = await prisma.role.delete({ where: { idRole: idRole } });
  res.json(role);
};

exports.updateRole = async (req, res) => {
  const { idRole, labelRole } = req.body;
  const role = await prisma.role.update({
    where: { idRole: idRole },
    data: {
      labelRole,
    },
  });
  res.json(role);
};
