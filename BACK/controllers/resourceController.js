import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Formats a date string into a custom format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {Object} An object containing the formatted date and time.
 * @property {string} jour - The formatted date in the format "dd/mm/yyyy".
 * @property {string} heure - The formatted time in the format "hh:mm:ss".
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hour}:${minute}:${second}`;
  return { date: formattedDate, heure: formattedTime };
};

exports.getResources = async (req, res) => {
  const resources = await prisma.resource.findMany({
    include: {
      comments: true,
      shares: true,
      author: true,
      categoryResource: true,
      typeResource: true,
    },
  });
  // Format the date of each resource
  resources.forEach((resource) => {
    resource.createdAt = formatDate(resource.createdAt);
  });
  res.json(resources);
};

exports.createResource = async (req, res) => {
  const resourceObject = JSON.parse(req.body.resource);
  const newResource = new Resource({
    ...resourceObject,
    content: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  const {
    title,
    content,
    isFavorite,
    isArchived,
    authorId,
    categoryResourceId,
    typeResourceId,
    isPrivate,
  } = newResource;
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
    include: {
      comments: true,
      shares: true,
      author: true,
      categoryResource: true,
      typeResource: true,
    },
  });
  res.json(resource);
};

exports.deleteResource = async (req, res) => {
  const { idResource } = req.body;
  const resource = await prisma.resource.delete({
    where: { idResource: idResource },
    include: {
      comments: true,
      shares: true,
      author: true,
      categoryResource: true,
      typeResource: true,
    },
  });
  res.json(resource);
};

exports.updateResource = async (req, res) => {
  const resourceObject = req.file
    ? {
        ...JSON.parse(req.body.resource),
        content: `${req.protocol}}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

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
  } = resourceObject;
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
    include: {
      comments: true,
      shares: true,
      author: true,
      categoryResource: true,
      typeResource: true,
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
      include: {
        comments: true,
        shares: true,
        author: true,
        categoryResource: true,
        typeResource: true,
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
