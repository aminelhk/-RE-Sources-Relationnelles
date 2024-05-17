// commentRoutes.js

import express from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
} from "../controllers/commentController";

const router = express.Router();

// Routes pour la création de commentaires et de réponses
router.get("/", getComments);
router.post("/createComment", createComment);
router.put("/updateComment", updateComment);
router.delete("/deleteComment", deleteComment);
router.get("/getCommentById", getCommentById);

module.exports = router;
