const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://investorplace.com/stock-quotes/tsla-stock-quote/", {
      waitUntil: "load",
      timeout: 180000 
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".articleswrap #ipm-related-articles #recent-stories-list-container .subcat-post-row h2 a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.innerText;
        if (!href.startsWith('http')) {
          href = `https://investorplace.com/${href}`;
        }
        console.log(href , title);
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
      timeout: 180000 ,
    });
        const content = await page.evaluate(() => {
        const ScrapeList = document.querySelector(".entry-content.story");      
          return (ScrapeList.innerHTML);
        });
        return content
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