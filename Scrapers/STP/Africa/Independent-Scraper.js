const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.independent.co.uk/news/world/africa", {
      waitUntil: "domcontentloaded",
      timeout: 120000
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll("#sectionContent a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        // let title = Scrape.querySelector('.title')?.innerText || "";
        if (!href.startsWith('http')) {
          href = `https://www.independent.co.uk${href}`;
        }
        return { href };
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
        waitUntil: "domcontentloaded",
        timeout: 120000
      });
  
      const content = await page.evaluate(() => {
        const ScrapeList = document.querySelector(".sc-jbiisr-0.ebhxqi.sc-jbiisr-2.loNmgs");
        return (ScrapeList.innerHTML);
      });
  
      const title = await page.evaluate(() => {
        const TitleElement = document.querySelector('.sc-qvufca-0.clNvih h1');
        return TitleElement ? TitleElement.innerText : '';
      });
  
      return {  title , content };
    } catch (error) {
      console.error(`Error during content scraping from ${url}:`, error);
      throw error;
    }
};

module.exports = {
  scrapeURLs,
  scrapeContentFromURL
};