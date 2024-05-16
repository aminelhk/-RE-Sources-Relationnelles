// commentController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  const { content, resourceId, authorId } = req.body;
  const comment = await prisma.comment.create({
    data: {
      content,
      authorId,
      resourceId,
    },
  });
  res.json(comment);
};

exports.createReply = async (req, res) => {
  const { content, parentId, resourceId, authorId } = req.body;
  const reply = await prisma.comment.create({
    data: {
      content,
      parentId,
      resourceId,
      authorId,
    },
  });
  res.json(reply);
};
