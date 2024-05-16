// commentRoutes.js

import express from "express";
import { createComment, createReply } from "../controllers/commentController";

const router = express.Router();

// Routes pour la création de commentaires et de réponses
router.post("/createComment", createComment);
router.post("/createReply", createReply);

module.exports = router;
