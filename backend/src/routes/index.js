const router = require("express").Router();
const integrationsRouter = require("./integrations");
const productsRouter = require("./products");
const usersRouter = require("./users");

router.use("/integrations", integrationsRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;