import express from "express";
import {
  getResources,
  addResource,
  deleteResource,
  updateResource,
} from "../controllers/resourceController";

const router = express.Router();

router.get("/", getResources);
router.post("/addResource", addResource);
router.delete("/deleteResource", deleteResource);
router.put("/updateResource", updateResource);

module.exports = router;
