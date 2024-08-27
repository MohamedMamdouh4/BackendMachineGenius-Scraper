require('dotenv').config();
const moment = require('moment')
const scraped_dataBase = require("../../Models/Scraped/scraped_model");
const verifyToken = require('../../Middlewares/verify_token');
const collectCanadaScrapers = require('../../Scrapers/STP/Canada/Collect-STPScrapers');
const collectUKScrapers = require('../../Scrapers/STP/UK/Collect-STPScrapers');

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

const Collect_Canada = async (req, res) => {
  try {
    const [cbcContent, thestarContent, glopalnewsContant] = await Promise.all([
      collectCanadaScrapers.scrapeCBC(),
      collectCanadaScrapers.scrapeTheStar(),
      collectCanadaScrapers.scrapeGlobalnews(),
    ]);

    const allContent_from_sites = [...cbcContent, ...thestarContent, ...glopalnewsContant];

    for (const article of allContent_from_sites) {
      const existingArticle = await scraped_dataBase.findOne({ title: article.title });
      if (!existingArticle) {
        await add_to_scraped(article.title, article.content, "streetPoliticsCanada" , moment.tz("Africa/Cairo").format('MMMM Do YYYY, h:mm:ss a'));
      }
    }
    res.json({ success: true, allArticles: allContent_from_sites });
  } catch (error) {
    console.error(`Error in Collect: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

const Collect_UK = async (req, res) => {
  try {
    const [telegraphContent] = await Promise.all([
      collectUKScrapers.scrapeReddit(),
    ]);

    const allContent_from_sites = [...telegraphContent];

    for (const article of allContent_from_sites) {
      // const existingArticle = await scraped_dataBase.findOne({ title: article.title });
      // if (!existingArticle) {
      //   await add_to_scraped(article.title, article.content, "streetPoliticsUK" , moment.tz("Africa/Cairo").format('MMMM Do YYYY, h:mm:ss a'));
      // }
    }
    res.json({ success: true, allArticles: allContent_from_sites });
  } catch (error) {
    console.error(`Error in Collect: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  Collect_Canada,
  Collect_UK
};