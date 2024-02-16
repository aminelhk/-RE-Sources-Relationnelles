import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getCommentsOnResources = async (req, res) => {
  const commentsOnResources = await prisma.commentsOnResources.findMany();
  res.json(commentsOnResources);
};

exports.createCommentsOnResources = async (req, res) => {
  const { userId, resourceId, contentComment } = req.body;
  const commentsOnResources = await prisma.commentsOnResources.create({
    data: { userId, resourceId, contentComment },
  });
  res.json(commentsOnResources);
};

// exports.deleteRole = async (req, res) => {
//   const { idRole } = req.body;
//   const role = await prisma.role.delete({ where: { idRole: idRole } });
//   res.json(role);
// };

// exports.updateRole = async (req, res) => {
//   const { idRole, labelRole } = req.body;
//   const role = await prisma.role.update({
//     where: { idRole: idRole },
//     data: {
//       labelRole,
//     },
//   });
//   res.json(role);
// };
