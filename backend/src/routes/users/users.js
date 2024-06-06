const usersRouter = require("express").Router();

usersRouter.get("/", function (req, res, next) {  
  res.send("Users");
});

module.exports = usersRouter;
