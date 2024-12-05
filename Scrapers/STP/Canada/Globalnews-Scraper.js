const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://globalnews.ca/politics/", {
      waitUntil: "load",
      timeout: 180000 
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".l-section__widget ul li a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.querySelector('.c-posts__headlineText')?.innerText || "";

        return { href, title };
      });
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
      waitUntil: "load",
      timeout: 180000 
    });
    const content = await page.evaluate(() => {
      const ScrapeList = document.querySelector(".l-article__text.js-story-text");
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