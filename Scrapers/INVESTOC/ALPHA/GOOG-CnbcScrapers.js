const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.cnbc.com/quotes/NVDA?tab=news", {
      waitUntil: "load",
      timeout: 280000
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll('div[data-test="QuoteNews-1"] .LatestNews-list li .LatestNews-container .LatestNews-headlineWrapper a');
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.innerText;
        if (!href.startsWith('http')) {
          href = `https://www.cnbc.com/${href}`;
        }
        console.log(href , title);
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
      timeout: 280000
    });
    const content = await page.evaluate(() => {
    const ScrapeList = document.querySelector(".ArticleBody-articleBody");
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