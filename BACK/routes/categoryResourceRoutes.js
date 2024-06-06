import express from "express";
import {
  getCategoriesResource,
  createCategoryResource,
  deleteCategoryResource,
  updateCategoryResource,
} from "../controllers/categoryResourceController";

const router = express.Router();

router.get("/", getCategoriesResource);
router.post("/createCategoryResource", createCategoryResource);
router.delete("/deleteCategoryResource", deleteCategoryResource);
router.put("/updateCategoryResource", updateCategoryResource);

module.exports = router;
