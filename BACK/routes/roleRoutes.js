import express from "express";
import {
  getRoles,
  createRole,
  deleteRole,
  updateRole,
} from "../controllers/roleController";

const router = express.Router();

router.get("/", getRoles);
router.post("/createRole", createRole);
router.delete("/deleteRole", deleteRole);
router.put("/updateRole", updateRole);

module.exports = router;
