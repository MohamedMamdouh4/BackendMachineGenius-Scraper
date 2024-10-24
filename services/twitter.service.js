// const puppeteer = require("puppeteer");
// const {socialAccountModel} = require("../Models/Twitter/socialAccount");
// const SocialMediaGroupsModel = require("../Models/Twitter/socialMediaGroup");

// const twitterScraping = async () => {
//   try {
//     const accounts = await socialAccountModel.find({});
//     const groups = await SocialMediaGroupsModel.find({});
//     const browser = await puppeteer.launch({ headless: true ,
//     args: [
//     '--disable-http2',
//     '--no-sandbox',
//     '--disable-setuid-sandbox',
//     '--enable-features=NetworkService,NetworkServiceInProcess',
//     ]
//   });
//     const page = await browser.newPage();
//     for (const account of accounts) {
//       await page.goto(`${account.accountLink}`, { waitUntil: "networkidle2" });
//       const followers = await page.evaluate(() => {
//         const followerElements = document.querySelectorAll(
//           ".css-175oi2r.r-13awgt0.r-18u37iz.r-1w6e6rj .css-175oi2r:nth-child(2) a span .css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3"
//         );
//         return Array.from(followerElements).map((el) => el.innerText);
//       });
//       account.followers = followers[0];
//       await account.save();
//       console.log(`Followers of ${account.accountLink}:`, followers[0]);
//     }
//     await browser.close();
//   } catch (error) {
//     console.error("Error while scraping followers:", error);
//   }
// };

// module.exports = { twitterScraping };
const puppeteer = require("puppeteer");
const { socialAccountModel } = require("../Models/Twitter/socialAccount");
const SocialMediaGroupsModel = require("../Models/Twitter/socialMediaGroup");
const GroupsAnalyticsModel = require("../Models/Twitter/analyticsModel");

const scrapeFollowers = async (page, link) => {
  await page.goto(link, { waitUntil: "networkidle2" });

  const followers = await page.evaluate(() => {
    const followerElements = document.querySelectorAll(
      ".css-175oi2r.r-13awgt0.r-18u37iz.r-1w6e6rj .css-175oi2r:nth-child(2) a span .css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3"
    );
    return Array.from(followerElements).map((el) => el.innerText);
  });

  return followers[0];
};
function convertStringToNumber(str) {
  if (!str) {
    return 0;
  }
  str = str.replace(/,/g, "");
  if (str.endsWith("K")) {
    return parseFloat(str) * 1000;
  } else if (str.endsWith("M")) {
    return parseFloat(str) * 1000000;
  } else {
    return parseFloat(str);
  }
}
const twitterScraping = async () => {
  try {
    const accounts = await socialAccountModel.find({});
    const groups = await SocialMediaGroupsModel.find({ platform: "TWITTER" });
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-http2",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--enable-features=NetworkService,NetworkServiceInProcess",
      ],
    });

    const page = await browser.newPage();

    for (const account of accounts) {
      const followers = await scrapeFollowers(page, account.accountLink);
      account.followers = followers;
      await account.save();
      console.log(`Followers of ${account.accountLink}:`, followers);
    }

    for (const group of groups) {
      const followers = await scrapeFollowers(page, group.link);
      const followersNumber = convertStringToNumber(followers);
      group.subscribers = followersNumber;
      await group.save();
      const subs = await GroupsAnalyticsModel.create({
        brand: group.brand,
        group_id: group.group_id,
        timestamp: Date.now(),
        platform: group.platform,
        subs: followersNumber,
      });
      console.log(`Followers of group ${group.link}:`, followersNumber);
    }

    await browser.close();
  } catch (error) {
    console.error("Error while scraping followers:", error);
  }
};

module.exports = { twitterScraping };
