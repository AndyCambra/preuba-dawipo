var express = require('express');
var router = express.Router();

const { postService } = require("../handlers/postService")

router.post("/", postService);

module.exports = router;
