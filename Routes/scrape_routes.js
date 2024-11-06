const express = require('express')
const router = express.Router()
const msg = "This module to handle the request and response of scrapping"

// Require modules
const scrapeConrollersSTP = require('../Controllers/Scraping Controllers/scrapeStreetPolitics_controller')
const scrapeConrollersINV = require('../Controllers/Scraping Controllers/scrapeINVEST_controller')
const scrapeConrollersMYTH = require('../Controllers/Scraping Controllers/scrapeMyth_controller')
const scrapeConrollersLB  = require('../Controllers/Scraping Controllers/scrapeLittleBirdie_controller')

router.get('/collect/streetPoliticsCanada', scrapeConrollersSTP.Collect_Canada);
router.get('/collect/streetPoliticsUK', scrapeConrollersSTP.Collect_UK);
router.get('/collect/streetPoliticsAfrica', scrapeConrollersSTP.Collect_Africa);

//////////////
router.get('/collect/investocracy/NVDA' , scrapeConrollersINV.CollectNvda)
router.get('/collect/investocracy/AAPL' , scrapeConrollersINV.CollectApple)
router.get('/collect/investocracy/AMD'  , scrapeConrollersINV.CollectAmd)
router.get('/collect/investocracy/AMZN'  , scrapeConrollersINV.CollectAmzn)
router.get('/collect/investocracy/PLTR'  , scrapeConrollersINV.CollectPltr)
router.get('/collect/investocracy/TSLA'  , scrapeConrollersINV.CollectTsla)
router.get('/collect/investocracy/ALPHA'  , scrapeConrollersINV.CollectAlpha)
//////////////

/////////////
router.get('/collect/twitter/NVDA' , scrapeConrollersINV.CollectTwitter)
router.get('/collect/twitter/PLTR' , scrapeConrollersINV.CollectTwitter)
////////////

////////------Myth---------///////////
router.get('/collect/MYTH', scrapeConrollersMYTH.Collect);

///////-------Little Birdie----///////
router.get('/collect/littlebirdie' , scrapeConrollersLB.Collect)

module.exports = router;
module.exports.msg = msg