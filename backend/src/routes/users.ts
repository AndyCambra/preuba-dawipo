import { Router } from "express";
import { check } from "express-validator";
import authMiddleware from "../middlewares/auth";
import {
  getUsers,
  getUserByName,
  registerUser,
  loginUser,
  putUser,
  deleteUser,
} from "../handlers";

const usersRouter = Router();

usersRouter.get("/:name", authMiddleware, getUserByName);
usersRouter.get("/", authMiddleware, getUsers);

usersRouter.post(
  "/register",
  [
    check("name", "Please provide your name").not().isEmpty(),
    check("lastName", "Please provide your last name").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "The password must be at least 8 characters long"
    ).isLength({ min: 8 }),
  ],
  registerUser
);

usersRouter.post(
  "/login",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "The password must be at least 8 characters long"
    ).isLength({ min: 8 }),
  ],
  loginUser
);

usersRouter.put(
  "/update",
  authMiddleware,
  [
    check("name", "Please provide your name").not().isEmpty(),
    check("lastName", "Please provide your last name").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "The password must be at least 8 characters long"
    ).isLength({ min: 8 }),
  ],
  putUser
);

usersRouter.delete("/:name", authMiddleware, deleteUser);

export default usersRouter;
