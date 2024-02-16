import express from "express";
import {
  getCommentsOnResources,
  createCommentsOnResources,
  //   deleteResource,
  //   updateResource,
} from "../controllers/commentsOnResourcesController";

const router = express.Router();

router.get("/", getCommentsOnResources);
router.post("/createCommentsOnResources", createCommentsOnResources);
// router.delete("/deleteResource", deleteResource);
// router.put("/updateResource", updateResource);

module.exports = router;
