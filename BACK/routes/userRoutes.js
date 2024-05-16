import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.post("/createUser", createUser);
router.delete("/deleteUser", deleteUser);
router.put("/updateUser", updateUser);
router.get("/getUserById", getUserById);

module.exports = router;
