import express from "express";
import {
  getRoles,
  addRole,
  deleteRole,
  updateRole,
} from "../controllers/roleController";

const router = express.Router();

router.get("/", getRoles);
router.post("/addRole", addRole);
router.delete("/deleteRole", deleteRole);
router.put("/updateRole", updateRole);

module.exports = router;
