const puppeteer = require("puppeteer");
const cbcScrape = require("./CBC-Scraper");
const thestarScraper = require("./TheStar-Scraper");
const globalnewsScraper = require("./Globalnews-Scraper");
const { delay } = require("../../../Utilites/delay_func");

const scrapeCBC = async () => {
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
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  try {
    const URLs = await cbcScrape.scrapeURLs(page);
    const allContent = [];
    for (let { href, title } of URLs) {
      console.log(`Scraping content from: ${href}`);
      try {
        const content = await cbcScrape.scrapeContentFromURL(page, href);
        if (title && content && content !== "Error fetching content") {
          allContent.push({ url: href, title, content });
        }
      } catch (error) {
        console.error(`Error scraping content from ${href}:`, error);
        allContent.push({
          url: href,
          title,
          content: "Error fetching content",
        });
      }
    }
    return allContent;
  } catch (error) {
    console.error("Error scraping all content:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

const scrapeTheStar = async () => {
  const browser = await puppeteer.launch({
    hheadless: true,
    args: [
      "--disable-http2",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-features=NetworkService,NetworkServiceInProcess",
    ],
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  try {
    const URLs = await thestarScraper.scrapeURLs(page);
    const allContent = [];
    for (let { href, title } of URLs) {
      console.log(`Scraping content from: ${href}`);
      try {
        const content = await thestarScraper.scrapeContentFromURL(page, href);
        if (title && content && content !== "Error fetching content") {
          allContent.push({ url: href, title, content });
        }
      } catch (error) {
        console.error(`Error scraping content from ${href}:`, error);
        allContent.push({
          url: href,
          title,
          content: "Error fetching content",
        });
      }
    }
    return allContent;
  } catch (error) {
    console.error("Error scraping all content:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

const scrapeGlobalnews = async () => {
  const browser = await puppeteer.launch({
    heheadless: true,
    args: [
      "--disable-http2",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-features=NetworkService,NetworkServiceInProcess",
    ],
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  try {
    const URLs = await globalnewsScraper.scrapeURLs(page);
    const allContent = [];
    for (let { href, title } of URLs) {
      console.log(`Scraping content from: ${href}`);
      try {
        const content = await globalnewsScraper.scrapeContentFromURL(
          page,
          href
        );
        if (title && content) {
          console.log({ url: href });
          allContent.push({ url: href, title, content });
          var filteredAllContent = allContent.filter((url) => url != null);
        }
      } catch (error) {
        console.error(`Error scraping content from ${href}:`, error);
        filteredAllContent.push({
          url: href,
          title,
          content: "Error fetching content",
        });
      }
    }
    return filteredAllContent;
  } catch (error) {
    console.error("Error scraping all content:", error);
    throw error;
  } finally {
    await browser.close();
  }
};

const Tests = async () => {
  try {
    console.log("Start new puppeteer");
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--disable-http2",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--enable-features=NetworkService,NetworkServiceInProcess",
      ],
    });
    console.log("======== Make new Page =======");
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(400000); // For navigation
    page.setDefaultTimeout(400 * 1000);
    console.log("======== create new Page =======");
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    console.log("After set Mozilla");
    const res = await page.goto("https://www.google.com", {
      waitUntil: "domcontentloaded",
    });
    console.log({ res });
    console.log("===================== After Go to =======================");
    await delay(4000);

    // try {
    //     console.log(`Scrape the links`);
    //     const URLs = await cbcScrape.scrapeURLs(page);
    //     const allContent = [];
    //     for (let { href, title } of URLs) {
    //         console.log(`Scraping content from: ${href}`);
    //         try
    //         {
    //             const content = await cbcScrape.scrapeContentFromURL(page, href);
    //             if(title && content && content!== "Error fetching content" )
    //             {
    //                 allContent.push({ url: href, title, content });
    //             }
    //         } catch (error) {
    //             console.error(`Error scraping content from ${href}:`, error);
    //             allContent.push({ url: href, title, content: 'Error fetching content' });
    //         }
    //     }
    //     return allContent;
  } catch (error) {
    console.error("Error scraping all content:", error);
    throw error;
  } finally {
    //   await browser.close();
  }
};

module.exports = {
  scrapeCBC,
  scrapeTheStar,
  scrapeGlobalnews,
  Tests,
};
