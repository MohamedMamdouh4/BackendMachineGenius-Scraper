const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.scripts.com/script/justice_league:_doom_11518", {
      waitUntil: "load",
      timeout: 180000
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
      timeout: 180000
    });
    const content = await page.evaluate(() => {
    const ScrapeList = document.querySelector("blockquote .wselect-cnt p");
      return Array.from(ScrapeList).map(Scrape => Scrape.innerText);
    });
    return content.join(' ');
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