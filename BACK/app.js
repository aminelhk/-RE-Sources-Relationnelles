import express from "express";
import cors from "cors";
import helmet from "helmet";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userRoutes from "./routes/userRoutes";
import palRoutes from "./routes/palRoutes";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const helmetOptions = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
};

const app = express();

app.use(express.json()); // Pour parser les corps de requêtes en JSON

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));

app.use("/api/users", userRoutes); // Route pour les utilisateurs
app.use("/api/pals", palRoutes); // Route pour les utilisateurs

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = prisma.user.findUnique({
        where: { email: req.body.email, password: hash },
      });
      user
        .save()
        .then(() => {
          res.statut = 201;
          res.json({ message: "Un utilisateur a été crée" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ message: "L'utilisateur n'existe pas" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Mot de passe incorrect" });
            }
            res.status(200).json({
              id: id,
              token: jwt.sign({ id: id }, "RANDOM TOKEN SECRET", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  };
};
module.exports = app;
