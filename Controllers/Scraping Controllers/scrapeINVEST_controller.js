
require('dotenv').config();
const moment = require('moment-timezone')
moment.tz.setDefault("Africa/Cairo")
const scrapedDBController = require("../Scraped DB Controller/scrapedDB_controller")
const scraped_dataBase = require("../../Models/Scraped/scraped_model");
const collect_NVDA = require('../../Scrapers/INVESTOC/NVDA/NVDA-Collector')
const collect_APPLE = require('../../Scrapers/INVESTOC/AAPL/APPLE-Collector')
const collect_AMD = require('../../Scrapers/INVESTOC/AMD/AMD-Collector')
const collect_AMZN = require('../../Scrapers/INVESTOC/AMZN/AMZN-Collector')
const collect_PLTR = require('../../Scrapers/INVESTOC/PLTR/PLTR-Collector')
const collect_TSLA = require('../../Scrapers/INVESTOC/TSLA/TSLA-Collector')
const collect_ALPHA = require('../../Scrapers/INVESTOC/ALPHA/GOOG-Collector')
//////////////
const collect_twitterPLTR = require('../../Scrapers/INVESTOC/Twitter/twitter-Colletor')
/////////////


/////////////------Stocks Gtom Sites------///////////////////
const CollectNvda = async (req, res) => {
    try {
        const [FoolContent , InvestorContent , TweaktownContent , BenzingaContent , CnbcContent] = await Promise.all([
            collect_NVDA.scrape_Fool(),
            collect_NVDA.scrape_Investor(),  
            collect_NVDA.scrape_Tweaktown(),
            collect_NVDA.scrape_Benzinga(),
            collect_NVDA.scrape_Cnbc(),
        ]);
        const allContent_from_sites = [].concat(FoolContent , InvestorContent , TweaktownContent , BenzingaContent , CnbcContent);

        var flag = 0 
        for (const article of allContent_from_sites) {
            const existingArticle = await scraped_dataBase.findOne({ title: article.title });
            if (!existingArticle) {
              await scrapedDBController.add_to_scraped(article.title, article.content, "investocracy" , "NVDA"  );
              flag = 1
            }
        }
        res.json({ success: true, StartOpenAI: flag , allArticles: allContent_from_sites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const CollectApple = async (req, res) => {
    try {
        const [FoolContent , InvestorContent , BenzingaContent] = await Promise.all([
            collect_APPLE.scrape_Fool(),
            collect_APPLE.scrape_Investor(),
            collect_APPLE.scrape_Benzinga()
        ]);
        // console.log("nvdaContent-->" + nvdaContent)
        const allContent_from_sites = [].concat(FoolContent , InvestorContent , BenzingaContent);

        var flag = 0
        for (const article of allContent_from_sites) {
            const existingArticle = await scraped_dataBase.findOne({ title: article.title });
            if (!existingArticle) {
              await scrapedDBController.add_to_scraped(article.title, article.content, "investocracy" , "AAPL"  );
              flag = 1
            }
        }
        res.json({ success: true, StartOpenAI: flag ,  allArticles: allContent_from_sites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const CollectAmd = async (req, res) => {
    try {
        const [FoolContent , InvestorContent] = await Promise.all([
            collect_AMD.scrape_Fool(),
            collect_AMD.scrape_Investor(),
        ]);
        const allContent_from_sites = [].concat(FoolContent , InvestorContent);

        var flag = 0
        for (const article of allContent_from_sites) {
            const existingArticle = await scraped_dataBase.findOne({ title: article.title });
            if (!existingArticle) {
              await scrapedDBController.add_to_scraped(article.title, article.content, "investocracy" , "AMD"  );
              flag = 1
            }
        }
        res.json({ success: true, StartOpenAI: flag , allArticles: allContent_from_sites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const CollectAmzn = async (req, res) => {
    try {
        const [FoolContent , InvestorContent] = await Promise.all([
            collect_AMZN.scrape_Fool(),
            collect_AMZN.scrape_Investor(),
        ]);
        // console.log("nvdaContent-->" + nvdaContent)
        const allContent_from_sites = [].concat(FoolContent , InvestorContent);

        var flag = 0
        for (const article of allContent_from_sites) {
            const existingArticle = await scraped_dataBase.findOne({ title: article.title });
            if (!existingArticle) {
              await scrapedDBController.add_to_scraped(article.title, article.content, "investocracy" , "AMZN"  );
              flag = 1
            }
        }

        res.json({ success: true, StartOpenAI: flag  , allArticles: allContent_from_sites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const CollectPltr = async (req, res) => {
    try {
        const [FoolContent , InvestorContent , AbooContent , BenzingaContent] = await Promise.all([
            collect_PLTR.scrape_Fool(),
            collect_PLTR.scrape_Investor(),
            collect_PLTR.scrape_Abbo(),
            collect_PLTR.scrape_Benzinga()
        ]);
        const allContent_from_sites = [].concat(FoolContent , InvestorContent , AbooContent , BenzingaContent);

        var flag = 0
        for (const article of allContent_from_sites) {
            const existingArticle = await scraped_dataBase.findOne({ title: article.title });
            if (!existingArticle) {
              await scrapedDBController.add_to_scraped(article.title, article.content, "investocracy" , "PLTR"  );
              flag = 1
            }
        }

        res.json({ success: true, StartOpenAI: flag ,  allArticles: allContent_from_sites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const CollectTsla = async (req, res) => {
    try {
        const [FoolContent , InvestorContent] = await Promise.all([
            collect_TSLA.scrape_Fool(),
            collect_TSLA.scrape_Investor(),
        ]);
        // console.log("nvdaContent-->" + nvdaContent)
        const allContent_from_sites = [].concat(FoolContent , InvestorContent);

        var flag = 0
        for (const article of allContent_from_sites) {
            const existingArticle = await scraped_dataBase.findOne({ title: article.title });
            if (!existingArticle) {
              await scrapedDBController.add_to_scraped(article.title, article.content, "investocracy" , "TSLA"  );
              flag = 1; 
            }
        }

        res.json({ success: true, StartOpenAI: flag ,  allArticles: allContent_from_sites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const CollectAlpha = async (req, res) => {
    try {
        const [FoolContent , InvestorContent , benzengaContent] = await Promise.all([
            collect_ALPHA.scrape_Fool(),
            collect_ALPHA.scrape_Investor(),
            collect_ALPHA.scrape_Benzinga()
        ]);
        // console.log("nvdaContent-->" + nvdaContent)
        const allContent_from_sites = [].concat(FoolContent , InvestorContent , benzengaContent);

        var flag = 0
        for (const article of allContent_from_sites) {
            const existingArticle = await scraped_dataBase.findOne({ title: article.title });
            if (!existingArticle) {
              await scrapedDBController.add_to_scraped(article.title, article.content, "investocracy" , "ALPHA" );
              flag = 1; 
            }
        }

        res.json({ success: true, StartOpenAI: flag ,  allArticles: allContent_from_sites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

////////////-------Stocks From Twitter--------/////////////////
const CollectTwitter = async (req, res) => {
    try {
      const tweetContents = await collect_twitterPLTR.collectAllAccounts();
      res.json({ success: true, allArticles: tweetContents });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};
  


module.exports = {
    //////
    CollectNvda,
    CollectApple,
    CollectAmd,
    CollectAmzn,
    CollectPltr,
    CollectTsla,
    CollectAlpha,
    //////
    CollectTwitter
}
