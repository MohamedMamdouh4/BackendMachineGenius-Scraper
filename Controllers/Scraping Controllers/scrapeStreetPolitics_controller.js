require('dotenv').config();
const moment = require('moment')
const scraped_dataBase = require("../../Models/Scraped/scraped_model");
const verifyToken = require('../../Middlewares/verify_token');
const collectCanadaScrapers = require('../../Scrapers/STP/Canada/Collect-STPScrapers');
const collectUKScrapers = require('../../Scrapers/STP/UK/Collect-STPScrapers');
const collectAfricaScrapers = require('../../Scrapers/STP/Africa/Collect-STPScrapers');

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

    var flag = 0
    for (const article of allContent_from_sites) {
      const existingArticle = await scraped_dataBase.findOne({ title: article.title });
      if (!existingArticle) {
        await add_to_scraped(article.title, article.content, "streetPoliticsCanada" , moment.tz("Africa/Cairo").format('MMMM Do YYYY, h:mm:ss a'));
        flag = 1
      }
    }
    res.json({ success: true, StartOopenAI: flag ,  allArticles: allContent_from_sites });
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
        await add_to_scraped(article.title, article.content, "streetPoliticsUK" , moment.tz("Africa/Cairo").format('MMMM Do YYYY, h:mm:ss a'));
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
    const [ bbcContent , independentContent , africanewsContent] = await Promise.all([
      collectAfricaScrapers.scrapeBbc(),
      collectAfricaScrapers.scrapeIndependent(),
      collectAfricaScrapers.scrapeAfricanews(),
    ]);

    const allContent_from_sites = [ ...bbcContent , ...independentContent , ...africanewsContent];

    var flag = 0;
    for (const article of allContent_from_sites) {
      const existingArticle = await scraped_dataBase.findOne({ title: article.content.title || article.title});
      if (!existingArticle) {
        await add_to_scraped(article.content.title , article.content.content, "streetPoliticsAfrica" , moment.tz("Africa/Cairo").format('MMMM Do YYYY, h:mm:ss a'));
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