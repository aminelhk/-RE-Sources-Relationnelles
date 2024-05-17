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

const router = express.Router();

router.get("/", getResources);
router.post("/createResource", createResource);
router.delete("/deleteResource", deleteResource);
router.put("/updateResource", updateResource);
router.get("/findOneResourceById", findOneResourceById);
router.put("/updateArchiveResource", updateArchiveResource);
router.put("/updateExploitResource", updateExploitResource);
router.put("/updateFavoriteResource", updateFavoriteResource);
router.post("/shareResource", shareResource);

module.exports = router;
