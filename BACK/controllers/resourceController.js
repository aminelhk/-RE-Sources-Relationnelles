import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getResources = async (req, res) => {
  const resources = await prisma.resource.findMany({
    include: {
      comments: true,
      shares: true,
    },
  });
  res.json(resources);
};

exports.createResource = async (req, res) => {
  const {
    title,
    content,
    isFavorite,
    isArchived,
    authorId,
    categoryResourceId,
    typeResourceId,
    isPrivate,
  } = req.body;
  const resource = await prisma.resource.create({
    data: {
      title,
      content,
      isFavorite,
      isArchived,
      isValidated: false,
      authorId,
      categoryResourceId,
      typeResourceId,
      isPrivate,
    },
  });
  res.json(resource);
};

exports.deleteResource = async (req, res) => {
  const { idResource } = req.body;
  const resource = await prisma.resource.delete({
    where: { idResource: idResource },
  });
  res.json(resource);
};

exports.updateResource = async (req, res) => {
  const {
    idResource,
    title,
    content,
    isFavorite,
    isArchived,
    isValidated,
    authorId,
    categoryResourceId,
    typeResourceId,
  } = req.body;
  const resource = await prisma.resource.update({
    where: { idResource: idResource },
    data: {
      title,
      content,
      isFavorite,
      isArchived,
      isValidated,
      authorId,
      categoryResourceId,
      typeResourceId,
    },
  });
  res.json(resource);
};

exports.findOneResourceById = async (req, res) => {
  const { idResource } = req.body;
  try {
    const resource = await prisma.resource.findUnique({
      where: {
        idResource: idResource,
      },
    });
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération de la ressource.",
    });
  }
};

exports.updateArchiveResource = async (req, res) => {
  const { idResource, isArchived } = req.body;
  const resource = await prisma.resource.update({
    where: { idResource: idResource },
    data: {
      isArchived,
    },
  });
  res.json(resource);
};

exports.updateExploitResource = async (req, res) => {
  const { idResource, isExploited } = req.body;
  const resource = await prisma.resource.update({
    where: { idResource: idResource },
    data: {
      isExploited,
    },
  });
  res.json(resource);
};

exports.updateFavoriteResource = async (req, res) => {
  const { idResource, isFavorite } = req.body;
  const resource = await prisma.resource.update({
    where: { idResource: idResource },
    data: {
      isFavorite,
    },
  });
  res.json(resource);
};

exports.shareResource = async (req, res) => {
  const { userId, resourceId } = req.body;
  try {
    const share = await prisma.share.create({
      data: {
        userId,
        resourceId,
      },
    });
    res.json(share);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur s'est produite lors du partage de la ressource.",
    });
  }
};
