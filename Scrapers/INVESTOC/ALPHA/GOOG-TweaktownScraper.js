const puppeteer = require('puppeteer');

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.tweaktown.com/hubs/nvidia/index.html", {
      waitUntil: "load",
      timeout: 180000 
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".category-listing .category-listing-article.clear-block a");
      return Array.from(ScrapeList)?.slice(0,10)?.map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.innerText;
        if (!href.startsWith('http')) {
          href = `https://www.tweaktown.com/news/${href}`;
        }
        console.log("------------>"+href , title);
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
      timeout: 180000 ,
    });
        const content = await page.evaluate(() => {
        const ScrapeList = document.querySelector("#main-content");      
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