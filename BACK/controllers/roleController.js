import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getRoles = async (req, res) => {
  const roles = await prisma.role.findMany();
  res.json(roles);
};

exports.addRole = async (req, res) => {
  const { idRole, labelRole } = req.body;
  const role = await prisma.role.create({
    data: { idRole, labelRole },
  });
  res.json(role);
};
