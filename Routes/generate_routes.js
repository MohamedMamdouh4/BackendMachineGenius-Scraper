const express = require('express')
const router = express.Router()
const msg = "This module to handle the request and response of AI generation model"
const { verifyToken } = require("../Middlewares/verify_token");
const accessUser = require('../Middlewares/allowed_to');

// Require modules
const generateContent = require('../Controllers/OpenAi Controllers/generateContent_controller')


router.post('/generate-content', generateContent.generateContent);

//////////

module.exports = router;
module.exports.msg = msg
