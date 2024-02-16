import express from "express";
import { getUsers, addUser, deleteUser } from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.post("/addUser", addUser);
router.delete("/deleteUser", deleteUser);

module.exports = router;
