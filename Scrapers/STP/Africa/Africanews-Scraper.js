const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.africanews.com/news/", {
      waitUntil: "domcontentloaded",
      timeout: 120000
    });

    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".main-content .layout.theme-block__spacer .media__body.teaser__body h2 a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.innerText || "";
        
        if (href) {
          if (!href.startsWith('http')) {
            href = `https://www.africanews.com${href}`;
            
          }
          return { href, title };
        }
        
        return null;  // Return null if href is invalid
      }).filter(Boolean);  // Filter out any null values
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
      const ScrapeList = document.querySelector(".article__body");
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