require('dotenv').config();
const moment = require('moment')
const scraped_dataBase = require("../../Models/Scraped/scraped_model");
const verifyToken = require('../../Middlewares/verify_token');
const collectScrapers = require('../../Scrapers/STP/Collect-STPScrapers');

const add_to_scraped = async (title, content, brand , date) => {
  try {
    const new_scraped = new scraped_dataBase({
      title,
      content,
      brand,
      date
    });
    await new_scraped.save();
    return new_scraped;
  } catch (error) {
    console.error(`Error saving to database: ${error}`);
    throw new Error(`Database save failed: ${error.message}`);
  }
};

const Collect = async (req, res) => {
  try {
    const [cbcContent, thestarContent, glopalnewsContant] = await Promise.all([
      collectScrapers.scrapeCBC(),
      collectScrapers.scrapeTheStar(),
      collectScrapers.scrapeGlobalnews(),
    ]);

    const allContent_from_sites = [...cbcContent, ...thestarContent, ...glopalnewsContant];

    for (const article of allContent_from_sites) {
      const existingArticle = await scraped_dataBase.findOne({ title: article.title });
      if (!existingArticle) {
        await add_to_scraped(article.title, article.content, "streetPoliticsCanada" , moment().format('MMMM Do YYYY, h:mm:ss a'));
      }
    }
    res.json({ success: true, allArticles: allContent_from_sites });
  } catch (error) {
    console.error(`Error in Collect: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  Collect,
};