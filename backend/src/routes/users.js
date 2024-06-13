const usersRouter = require("express").Router();
const { check } = require('express-validator');
const {
  getUsers,
  getUserByName,
  postUser,
  putUser,
  deleteUser,  
} = require("../handlers");

usersRouter.get("/:name", getUserByName);
usersRouter.get("/", getUsers);

usersRouter.post(
  "/",
  [
    check('name', 'Please provide your name').not().isEmpty(),
    check('lastName', 'Please provide your last name').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'The password must be at least 8 characters long').isLength({ min: 8 })
  ],
  postUser
);

usersRouter.put(
  "/update",
  [
    check('name', 'Please provide your name').not().isEmpty(),
    check('lastName', 'Please provide your last name').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'The password must be at least 8 characters long').isLength({ min: 8 })
  ],
  putUser
);

usersRouter.delete("/:name", deleteUser);

module.exports = usersRouter;
