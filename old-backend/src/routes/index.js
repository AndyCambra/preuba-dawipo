const router = require("express").Router();
const connectorsRouter = require("./connectors");
const productsRouter = require("./products");
const usersRouter = require("./users");

router.use("/connectors", connectorsRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;
