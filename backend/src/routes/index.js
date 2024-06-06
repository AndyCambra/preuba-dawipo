const router = require('express').Router();
const servicesRouter = require("./services")
const usersRouter = require("./users")

router.use('/services', servicesRouter);
router.use('/users', usersRouter);

module.exports = router;