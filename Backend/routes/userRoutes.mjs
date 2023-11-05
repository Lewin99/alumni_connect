import express from "express";
import {
  registerUser,
  getUserById,
  listAllUsers,
  updateUser,
  deleteUserById,
  login,
  verifyAuthentication,
  getUserRole,
  logout,
} from "../controllers/userControllers.mjs";

const usersRouter = express.Router();

usersRouter.get("/", listAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/", registerUser);
usersRouter.post("/userrole", getUserRole);
usersRouter.get("/", listAllUsers);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);
usersRouter.post("/verifyauth", verifyAuthentication);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUserById);

export default usersRouter;
