import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

exports.createUser = async (req, res) => {
  const {
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
  const user = await prisma.user.create({
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
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const { idUser } = req.body;
  const user = await prisma.user.delete({ where: { idUser: idUser } });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const {
    idUser,
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
  const user = await prisma.user.update({
    where: { idUser: idUser },
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
  res.json(user);
};

exports.activateUser = async (req, res) => {
  const { idUser, isActive } = req.body;
  const user = await prisma.user.update({
    where: { idUser: idUser },
    data: {
      idUser,
      isActive,
    },
  });
  res.json(user);
};
