import multer from "multer";

// Define the MIME types allowed for the images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg": "svg",
  "image/pdf": "pdf",
};

/**
 * Multer disk storage configuration.
 * @type {import('multer').StorageEngine}
 */
const storage = multer.diskStorage({
  // Destination of the file
  destination: (req, file, callBack) => {
    // Save the file in the images folder
    callBack(null, "images");
  },
  // Name of the file
  filename: (req, file, callBack) => {
    // Create a unique name for the file
    callBack(null, Date.now() + file.originalname.split(" ").join("_"));
  },
});

export default multer({ storage: storage }).single("image");
