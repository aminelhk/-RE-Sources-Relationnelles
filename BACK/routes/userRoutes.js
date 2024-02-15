import express from "express";
import { getUsers, addUser } from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.post("/addUser", addUser);

module.exports = router;
