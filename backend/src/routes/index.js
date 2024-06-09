const router = require("express").Router();
const servicesRouter = require("./services");
const productsRouter = require("./products");
const usersRouter = require("./users");

router.use("/services", servicesRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;