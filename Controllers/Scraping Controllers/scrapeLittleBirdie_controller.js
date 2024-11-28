require('dotenv').config();
const moment = require('moment-timezone')
moment.tz.setDefault("Africa/Cairo")
const scrapedDBController = require("../Scraped DB Controller/scrapedDB_controller")
const scraped_dataBase = require("../../Models/Scraped/scraped_model");
const collectScrapers = require('../../Scrapers/Little Birdie/Collect-LBScrapers');



const Collect = async (req, res) => {
  try {
    const [ skyNewsContent , theGurdianContent , theMirrorContent ] = await Promise.all([
      collectScrapers.scrapeSkyNews(),
      collectScrapers.scrapeTheGurdian(),
      collectScrapers.scrapeTheMirror()
    ]);

    const allContent_from_sites = [...skyNewsContent , theGurdianContent , theMirrorContent];

    var flag = 0
    for (const article of allContent_from_sites) {
      console.log("TITlE------>",article.title);      
      const existingArticle = await scraped_dataBase.findOne({ title: article.title });
      if (!existingArticle) {
        await scrapedDBController.add_to_scraped(article.url , article.title, article.content, "673de310f696268e2fe1f508" );
        flag = 1
      }
    }
    res.json({ success: true, StartOpenAI: flag ,  allArticles: allContent_from_sites });
  } catch (error) {
    console.error(`Error in Collect: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  Collect
};
