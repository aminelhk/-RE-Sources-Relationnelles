import express from "express";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.post("/addUser", addUser);
router.delete("/deleteUser", deleteUser);
router.put("/updateUser", updateUser);

module.exports = router;
