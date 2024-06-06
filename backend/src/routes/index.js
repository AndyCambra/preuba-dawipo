const router = require('express').Router();
const servicesRouter = require("./services/services")
const usersRouter = require("./users/users")

router.use('/services', servicesRouter);
router.use('/users', usersRouter);

module.exports = router;