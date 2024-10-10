const express = require('express')
const twitterRouter  = express.Router()
const twitterScrapFollowers = require("../Controllers/socialMedia");
twitterRouter.get("/twitterScrap",twitterScrapFollowers);
module.exports =  {twitterRouter};