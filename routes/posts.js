const express = require('express');
const router = express.Router();
const postsController = require("../controllers/posts_contoller");
const passport = require('passport');

router.post('/create', passport.checkAuthentication, postsController.create);

module.exports = router;