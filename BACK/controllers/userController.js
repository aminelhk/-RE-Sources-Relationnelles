import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const secretKey = process.env.SECRET_KEY;

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (req, res) => {
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

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      phone,
      password: hashedPassword, // Save the hashed password
      pseudo,
      isActive,
      isPrivet,
      vitalCardNumber,
      roleId,
    },
  });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const { idUser } = req.body;
  const user = await prisma.user.delete({ where: { idUser: idUser } });
  res.json(user);
};

export const updateUser = async (req, res) => {
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

  // Hash the password if it is being updated
  const data = {
    email,
    firstName,
    lastName,
    phone,
    pseudo,
    isActive,
    isPrivet,
    vitalCardNumber,
    roleId,
  };

  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  const user = await prisma.user.update({
    where: { idUser: idUser },
    data: data,
  });
  res.json(user);
};

export const getUserById = async (req, res) => {
  const { idUser } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        idUser: idUser,
      },
      include: { role: true },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération de la ressource.",
    });
  }
};

// Fonction pour connecter un utilisateur
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Adresse mail ou mot de passe non valide" });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({
          error:
            "Votre compte est inactif. Veuillez contacter l'administrateur.",
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Adresse mail ou mot de passe non valide" });
    }

    const token = jwt.sign({ idUser: user.idUser }, secretKey, {
      expiresIn: "12h",
    });

    res.cookie("token", token, {
      maxAge: 12 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({ token });
  } catch (error) {
    console.error("Erreur de connexion de l’utilisateur :", error);
    res.status(500).json({ error: "Impossible de connecter utilisateur" });
  }
};
