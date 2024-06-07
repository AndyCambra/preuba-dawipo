const router = require("express").Router();
const servicesRouter = require("./services");
const usersRouter = require("./users");
const externalApisRouter = require("./externalApis");

router.use("/services", servicesRouter);
router.use("/users", usersRouter);
router.use("/externalApis", externalApisRouter);

module.exports = router;
