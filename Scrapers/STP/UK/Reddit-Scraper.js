const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.reddit.com/r/ukpolitics/", {
      waitUntil: "domcontentloaded",
      timeout: 120000
    });

    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll("article a");
      return Array.from(ScrapeList)
        .map(Scrape => {
          let href = Scrape.getAttribute("href");
          let title = Scrape.innerText || "";
          if (href && href.startsWith('http')) {
            return { href, title };
          }
          return null;
        })
        .filter(Boolean);  // Filters out null values and remove all wrong href
    });

    return URLs;
  } catch (error) {
    console.error('Error during URL scraping:', error);
    throw error;
  }
};


const scrapeContentFromURL = async (page, url) => {
  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 120000
    });
    const content = await page.evaluate(() => {
      const ScrapeList = document.querySelector("article");
      return(ScrapeList.innerHTML);
    });
    return content;
  } catch (error) {
    console.error(`Error during content scraping from ${url}:`, error);
    throw error;
  }
};

module.exports = {
  scrapeURLs,
  scrapeContentFromURL
};