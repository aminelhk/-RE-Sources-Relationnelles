import express from "express";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import resourceRoutes from "./routes/resourceRoutes";
import typesResourceRoutes from "./routes/typeResourceRoutes";
import categoriesResourceRoutes from "./routes/categoryResourceRoutes";
import commentsRoutes from "./routes/commentRoutes";

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
app.use("/api/roles", roleRoutes); // Route pour les roles
app.use("/api/resources", resourceRoutes); // Route pour les resources
app.use("/api/typesResource", typesResourceRoutes); // Route pour les typesResource
app.use("/api/categoriesResource", categoriesResourceRoutes); // Route pour les utilisateurs
app.use("/api/resources/:id", resourceRoutes); // Route pour les resources by id
app.use("/api/comments", commentsRoutes); // Route pour les commentaires

module.exports = app;
