const twitterScraping = require("../services/twitter.service");
const twitterScrapFollowers = async (req, res) => {
  try {
    await twitterScraping.twitterScraping();
    res.status(200).json({
      message: "Twitter Scraping Completed and DataBase Followers Updated",
    });
  } catch (error) {
    console.error("Error while scraping followers:", error);
    res.status(500).json({
      message: "Error while scraping followers",
    });
  }
};
module.exports = twitterScrapFollowers;
