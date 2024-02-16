import express from "express";
import {
  getCategoryResources,
  addCategoryResource,
  deleteCategoryResource,
  updateCategoryResource,
} from "../controllers/categoryResourceController";

const router = express.Router();

router.get("/", getCategoryResources);
router.post("/addCategoryResource", addCategoryResource);
router.delete("/deleteCategoryResource", deleteCategoryResource);
router.put("/updateCategoryResource", updateCategoryResource);

module.exports = router;
