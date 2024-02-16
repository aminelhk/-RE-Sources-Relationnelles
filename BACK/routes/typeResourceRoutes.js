import express from "express";
import {
  getTypeResources,
  addTypeResource,
  deleteTypeResource,
  updateTypeResource,
} from "../controllers/typeResourceController";

const router = express.Router();

router.get("/", getTypeResources);
router.post("/addTypeResource", addTypeResource);
router.delete("/deleteTypeResource", deleteTypeResource);
router.put("/updateTypeResource", updateTypeResource);

module.exports = router;
