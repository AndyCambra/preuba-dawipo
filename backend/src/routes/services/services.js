const servicesRouter = require("express").Router();

const { postService, postData } = require("../../handlers/postService");

servicesRouter.post("/", postService);

servicesRouter.get("/", function (req, res, next) {
  res.send(postData);
});

servicesRouter.delete("/delete/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < postData.length + 1) {
    postData[0].splice(index, 1);
    res.send({ message: `Item ${index} deleted successfully` });
  } else {
    res.status(404).send({ message: `Item ${index} not found` });
  }
});

module.exports = servicesRouter;
