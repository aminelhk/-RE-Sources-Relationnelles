// commentController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        author: true,
        resource: true,
        replies: true,
        parentComment: true,
      },
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des commentaires.",
    });
  }
};

exports.createComment = async (req, res) => {
  const { content, resourceId, authorId, parentId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        resourceId,
        parentId,
      },
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la création du commentaire.",
    });
  }
};

exports.deleteComment = async (req, res) => {
  const { idComment } = req.body;
  try {
    const comment = await prisma.comment.delete({
      where: { idComment: idComment },
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la suppression du commentaire.",
    });
  }
};

exports.updateComment = async (req, res) => {
  const { idComment, content } = req.body;
  try {
    const comment = await prisma.comment.update({
      where: { idComment: idComment },
      data: {
        content,
      },
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la mise à jour du commentaire.",
    });
  }
};

export const getCommentById = async (req, res) => {
  const { idComment } = req.body;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        idComment: idComment,
      },
      include: {
        author: true,
        resource: true,
        replies: true,
        parentComment: true,
      },
    });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération du commentaire.",
    });
  }
};
