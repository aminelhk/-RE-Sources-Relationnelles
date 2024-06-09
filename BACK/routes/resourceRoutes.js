import express from "express";
import {
  getResources,
  createResource,
  deleteResource,
  updateResource,
  findOneResourceById,
  updateArchiveResource,
  updateExploitResource,
  updateFavoriteResource,
  shareResource,
} from "../controllers/resourceController";
import multer from "../middleware/multerConfig";

const router = express.Router();

router.get("/", getResources);
router.post("/createResource", multer, createResource);
router.delete("/deleteResource", deleteResource);
router.put("/updateResource", multer, updateResource);
router.get("/findOneResourceById", findOneResourceById);
router.put("/updateArchiveResource", updateArchiveResource);
router.put("/updateExploitResource", updateExploitResource);
router.put("/updateFavoriteResource", updateFavoriteResource);
router.post("/shareResource", shareResource);

module.exports = router;
