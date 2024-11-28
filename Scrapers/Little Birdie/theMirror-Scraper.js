const puppeteer = require("puppeteer");

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.themirror.com/entertainment/", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".mod-pancakes article a");
      return Array.from(ScrapeList).map((Scrape) => {
        let href = Scrape.getAttribute("href");
        const title = Scrape.innerText;
        if (!href.startsWith("http")) {
          href = `https://www.themirror.com/entertainment${href}`;
        }
        return { href, title };
      });
    });
    return URLs;
  } catch (error) {
    console.error("Error during URL scraping:", error);
    throw error;
  }
};

const scrapeContentFromURL = async (page, url) => {
  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    const content = await page.evaluate(() => {
      const ScrapeList = document.querySelector(
        ".article-body"
      );
      return ScrapeList.innerHTML;
    });
    return content;
  } catch (error) {
    console.error(`Error during content scraping from ${url}:`, error);
    throw error;
  }
};

module.exports = {
  scrapeURLs,
  scrapeContentFromURL,
};
