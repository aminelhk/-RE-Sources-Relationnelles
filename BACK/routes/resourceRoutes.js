import express from "express";
import {
  getResources,
  createResource,
  deleteResource,
  updateResource,
} from "../controllers/resourceController";

const router = express.Router();

router.get("/", getResources);
router.post("/createResource", createResource);
router.delete("/deleteResource", deleteResource);
router.put("/updateResource", updateResource);

module.exports = router;
