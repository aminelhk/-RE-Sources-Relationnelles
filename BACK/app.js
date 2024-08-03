import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import resourceRoutes from "./routes/resourceRoutes";
import typesResourceRoutes from "./routes/typeResourceRoutes";
import categoriesResourceRoutes from "./routes/categoryResourceRoutes";
import commentsRoutes from "./routes/commentRoutes";

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:8081",
    "https://resourcesrelationnelles.azurewebsites.net",
  ],
  optionsSuccessStatus: 200,
};

const helmetOptions = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
};

const app = express();

app.use(express.json()); // Pour parser les corps de requêtes en JSON
app.use(cors(corsOptions)); // Placement du middleware CORS avant les routes
app.use(helmet(helmetOptions));

app.use("/api/users", userRoutes); // Route pour les utilisateurs
app.use("/api/roles", roleRoutes); // Route pour les roles
app.use("/api/resources", resourceRoutes); // Route pour les resources
app.use("/api/typesResource", typesResourceRoutes); // Route pour les typesResource
app.use("/api/categoriesResource", categoriesResourceRoutes); // Route pour les catégories de resources
app.use("/api/resources/:id", resourceRoutes); // Route pour les resources by id
app.use("/api/comments", commentsRoutes); // Route pour les commentaires
app.use("/images", express.static(path.join(__dirname, "images"))); // Route pour les images

// Pour répondre aux requêtes préliminaires OPTIONS
app.options("*", cors(corsOptions));

module.exports = app;
