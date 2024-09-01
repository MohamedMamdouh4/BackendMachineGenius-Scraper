const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.telegraph.co.uk/politics/", {
      waitUntil: "domcontentloaded",
      timeout: 120000
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".article-list.article-list-six-col.article-list--six-col ul li a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.querySelector('.card__content span')?.innerText || "";
        if (!href.startsWith('http')) {
          href = `https://www.telegraph.co.uk${href}`;
        }
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
      waitUntil: "domcontentloaded",
      timeout: 120000
    });
    const content = await page.evaluate(() => {
      const ScrapeList = document.querySelector("div[data-test='tpl-article-body-recipe']");
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