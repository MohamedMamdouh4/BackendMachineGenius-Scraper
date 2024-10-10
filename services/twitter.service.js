const puppeteer = require("puppeteer");
const {socialAccountModel} = require("../Models/Twitter/socialAccount");

const twitterScraping = async () => {
  try {
    const accounts = await socialAccountModel.find({});
    const browser = await puppeteer.launch({ headless: true ,
    args: [
    '--disable-http2',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--enable-features=NetworkService,NetworkServiceInProcess',
    ]
  });
    const page = await browser.newPage();
    for (const account of accounts) {        
      await page.goto(`${account.accountLink}`, { waitUntil: "networkidle2" });
      const followers = await page.evaluate(() => {
        const followerElements = document.querySelectorAll(
          ".css-175oi2r.r-13awgt0.r-18u37iz.r-1w6e6rj .css-175oi2r:nth-child(2) a span .css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3"
        );
        return Array.from(followerElements).map((el) => el.innerText);
      });
      account.followers = followers[0];
      await account.save();
      console.log(`Followers of ${account.accountLink}:`, followers[0]);      
    }
    await browser.close();
  } catch (error) {
    console.error("Error while scraping followers:", error);
  }
};

module.exports = { twitterScraping };
