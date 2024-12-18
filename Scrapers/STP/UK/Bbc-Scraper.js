const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.bbc.com/news/politics", {
      waitUntil: "load",
      timeout: 180000 
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll("#main-content a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.querySelector('h2')?.innerText || "";
        if (!href.startsWith('http')) {
          href = `https://www.bbc.com/${href}`;
        }
        return { href, title };
      });
    });
    return (URLs);
  } catch (error) {
    console.error('Error during URL scraping:', error);
    throw error;
  }
};

const scrapeContentFromURL = async (page, url) => {
  try {
    await page.goto(url, {
      waitUntil: "load",
      timeout: 180000 
    });
    const content = await page.evaluate(() => {
      const ScrapeList = document.querySelector("article");
      return (ScrapeList.innerHTML);
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