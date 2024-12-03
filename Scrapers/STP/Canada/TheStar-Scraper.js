const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.thestar.com/politics/", {
      waitUntil: "load",
      timeout: 120000
    });
    // await page.goto('https://www.thestar.com/politics/', { waitUntil: 'load' });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".tnt-has-block-bg a.tnt-asset-link");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        const title = Scrape.innerText;
        if (!href.startsWith('http')) {
          href = `https://www.thestar.com${href}`;
        }
        return { href, title };
      });
    });
    return URLs;
  } catch (error) {
    // await browser.close();
    console.error('Error during URL scraping:', error);
    throw error;
  }
  };
  

const scrapeContentFromURL = async (page, url) => {
  try {
    await page.goto(url, {
      waitUntil: "load",
      timeout: 120000
    });
    const content = await page.evaluate(() => {
    const ScrapeList = document.querySelector(".asset-body");
      return (ScrapeList.innerHTML);
    });
    return content;
  }
    catch (error) {
      // await browser.close();
      console.error(`Error during content scraping from ${url}:`, error);
      throw error;
    }
};

module.exports = 
{
    scrapeURLs,
    scrapeContentFromURL
}