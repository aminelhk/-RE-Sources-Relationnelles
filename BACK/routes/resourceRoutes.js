import express from "express";
import {
  getResources,
  createResource,
  deleteResource,
  updateResource,
  updateArchiveResource,
  updateExploitResource,
  updateFavoriteResource,
} from "../controllers/resourceController";

const router = express.Router();

router.get("/", getResources);
router.post("/createResource", createResource);
router.delete("/deleteResource", deleteResource);
router.put("/updateResource", updateResource);
router.put("/updateArchiveResource", updateArchiveResource);
router.put("/updateExploitResource", updateExploitResource);
router.put("/updateFavoriteResource", updateFavoriteResource);

module.exports = router;
