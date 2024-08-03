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
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching resources.",
    });
  }
};

exports.createResource = async (req, res) => {
  try {
    const resourceObject = req.file
      ? {
          ...JSON.parse(req.body.resource),
          content: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    const {
      title,
      content,
      isFavorite,
      isArchived,
      authorId,
      categoryResourceId,
      typeResourceId,
      isPrivate,
    } = resourceObject;

    if (!title || !content || !authorId || !categoryResourceId || !typeResourceId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the resource.",
    });
  }
};

exports.deleteResource = async (req, res) => {
  const { idResource } = req.body;
  if (!idResource) {
    return res.status(400).json({ error: "idResource is required." });
  }
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the resource.",
    });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const resourceObject = req.file
      ? {
          ...JSON.parse(req.body.resource),
          content: `${req.protocol}://${req.get("host")}/images/${
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
      isPrivate, // Make sure this is included
    } = resourceObject;

    if (!idResource) {
      return res.status(400).json({ error: "idResource is required." });
    }
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }
    if (!content) {
      return res.status(400).json({ error: "Content is required." });
    }
    if (!authorId) {
      return res.status(400).json({ error: "Author ID is required." });
    }
    if (!categoryResourceId) {
      return res.status(400).json({ error: "Category Resource ID is required." });
    }
    if (!typeResourceId) {
      return res.status(400).json({ error: "Type Resource ID is required." });
    }
    if (isPrivate !== undefined && typeof isPrivate !== "boolean") {
      return res.status(400).json({ error: "isPrivate must be a boolean." });
    }

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
    if (!resource) {
      return res.status(404).json({ error: "Resource not found." });
    }
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching the resource.",
    });
  }
};

exports.updateArchiveResource = async (req, res) => {
  const { idResource, isArchived } = req.body;
  if (!idResource || typeof isArchived !== "boolean") {
    return res.status(400).json({ error: "Invalid request body." });
  }
  try {
    const resource = await prisma.resource.update({
      where: { idResource: idResource },
      data: {
        isArchived,
      },
    });
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the archive status.",
    });
  }
};

exports.updateExploitResource = async (req, res) => {
  const { idResource, isExploited } = req.body;
  if (!idResource || typeof isExploited !== "boolean") {
    return res.status(400).json({ error: "Invalid request body." });
  }
  try {
    const resource = await prisma.resource.update({
      where: { idResource: idResource },
      data: {
        isExploited,
      },
    });
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the exploitation status.",
    });
  }
};

exports.updateFavoriteResource = async (req, res) => {
  const { idResource, isFavorite } = req.body;
  if (!idResource || typeof isFavorite !== "boolean") {
    return res.status(400).json({ error: "Invalid request body." });
  }
  try {
    const resource = await prisma.resource.update({
      where: { idResource: idResource },
      data: {
        isFavorite,
      },
    });
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the favorite status.",
    });
  }
};

exports.shareResource = async (req, res) => {
  const { userId, resourceId } = req.body;
  if (!userId || !resourceId) {
    return res.status(400).json({ error: "userId and resourceId are required." });
  }
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
      error: "An error occurred while sharing the resource.",
    });
  }
};
