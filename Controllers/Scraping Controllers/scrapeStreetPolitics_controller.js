require('dotenv').config();
const moment = require('moment-timezone')
moment.tz.setDefault("Africa/Cairo")
const scrapedDBController = require("../Scraped DB Controller/scrapedDB_controller")
const scraped_dataBase = require("../../Models/Scraped/scraped_model");
const verifyToken = require('../../Middlewares/verify_token');
const collectCanadaScrapers = require('../../Scrapers/STP/Canada/Collect-STPScrapers');
const collectUKScrapers = require('../../Scrapers/STP/UK/Collect-STPScrapers');
const collectAfricaScrapers = require('../../Scrapers/STP/Africa/Collect-STPScrapers');


const Collect_Canada = async (req, res) => {
  try {
    const [cbcContent, thestarContent, glopalnewsContant] = await Promise.all([
      collectCanadaScrapers.scrapeCBC(),
      collectCanadaScrapers.scrapeTheStar(),
      collectCanadaScrapers.scrapeGlobalnews(),
    ]);

    const allContent_from_sites = [...cbcContent, ...thestarContent, ...glopalnewsContant];

    var flag = 0
    for (const article of allContent_from_sites) {
      const existingArticle = await scraped_dataBase.findOne({ title: article.title });
      if (!existingArticle) {
        await scrapedDBController.add_to_scraped(article.title, article.content, "streetPoliticsCanada" );
        flag = 1
      }
    }
    res.json({ success: true, StartOpenAI: flag ,  allArticles: allContent_from_sites });
  } catch (error) {
    console.error(`Error in Collect: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

const Collect_UK = async (req, res) => {
  try {
    const [telegraphContent , bbcContent , redditContent] = await Promise.all([
      collectUKScrapers.scrapeTelegraph(),
      collectUKScrapers.scrapeBbc(),
      collectUKScrapers.scrapeReddit(),
    ]);

    const allContent_from_sites = [...telegraphContent , ...bbcContent , ...redditContent];

    var flag = 0
    for (const article of allContent_from_sites) {
      const existingArticle = await scraped_dataBase.findOne({ title: article.title });
      if (!existingArticle) {
        flag = 1
        await scrapedDBController.add_to_scraped(article.title, article.content, "streetPoliticsUK"  );
      }
    }

    res.json({ success: true, StartOpenAI: flag , allArticles: allContent_from_sites });
  } catch (error) {
    console.error(`Error in Collect: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

const Collect_Africa = async (req, res) => {
  try {
    const [bbcContent , independentContent , africanewsContent , issafricaContent] = await Promise.all([
      collectAfricaScrapers.scrapeBbc(),
      collectAfricaScrapers.scrapeIndependent(),
      collectAfricaScrapers.scrapeAfricanews(),
      collectAfricaScrapers.scrapeIssafrica()
    ]);

    const allContent_from_sites = [ ...bbcContent , ...independentContent , ...africanewsContent ,  ...issafricaContent];

    var flag = 0;
    for (const article of allContent_from_sites) {
      const existingArticle = await scraped_dataBase.findOne({ title: article.content.title || article.title});
      if (!existingArticle) {
        await scrapedDBController.add_to_scraped(article.content.title || article.title , article.content.content || article.content, "streetPoliticsAfrica"  );
        flag = 1
      }
    }
    res.json({ success: true, allArticles: allContent_from_sites ,StartOpenAI: flag });
  } catch (error) {
    console.error(`Error in Collect: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  Collect_Canada,
  Collect_UK,
  Collect_Africa
};
