import express from "express";
import {
  getTypesResource,
  createTypeResource,
  deleteTypeResource,
  updateTypeResource,
} from "../controllers/typeResourceController";

const router = express.Router();

router.get("/", getTypesResource);
router.post("/createTypeResource", createTypeResource);
router.delete("/deleteTypeResource", deleteTypeResource);
router.put("/updateTypeResource", updateTypeResource);

module.exports = router;
