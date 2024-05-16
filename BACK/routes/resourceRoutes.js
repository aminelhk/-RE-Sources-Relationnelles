// resourceRoutes.js

import express from "express";
import {
  getResources,
  createResource,
  deleteResource,
  updateResource,
  findOneResourceById,
} from "../controllers/resourceController";

const router = express.Router();

router.get("/", getResources);
router.post("/createResource", createResource);
router.delete("/deleteResource", deleteResource);
router.put("/updateResource", updateResource);
router.get("/findOneResourceById", findOneResourceById);

module.exports = router;
