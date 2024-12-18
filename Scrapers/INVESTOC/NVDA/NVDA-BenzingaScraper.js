const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.benzinga.com/quote/NVDA/news", {
      waitUntil: "load",
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".news-content div ul li a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.querySelector('.content-title span').innerText;
        if (!href.startsWith('http')) {
          href = `https://www.benzinga.com/${href}`;
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
    });
    const content = await page.evaluate(() => {
    const ScrapeList = document.querySelector(".article-content-body .article-content-body-only");
      return(ScrapeList.innerHTML);
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