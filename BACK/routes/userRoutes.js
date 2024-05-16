import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
  loginUser,
  logoutUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.post("/createUser", createUser);
router.delete("/deleteUser", deleteUser);
router.put("/updateUser", updateUser);
router.get("/getUserById", getUserById);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
