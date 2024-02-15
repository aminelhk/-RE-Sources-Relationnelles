import express from "express";
import { getRoles, addRole } from "../controllers/roleController";

const router = express.Router();

router.get("/", getRoles);
router.post("/addRole", addRole);

module.exports = router;
