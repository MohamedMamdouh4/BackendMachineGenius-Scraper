const puppeteer = require("puppeteer");
const delay = require("../../Utilites/delay_func");

const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.theguardian.com/uk/film", {
      waitUntil: "load",
      timeout: 180000 ,
    });

    await delay.delay(12000); 

    try {
      await page.waitForSelector('button[title="No, thank you"], button[aria-label="No, thank you"]', { visible: true, timeout: 10000 });
      await page.click('button[title="No, thank you"], button[aria-label="No, thank you"]');
      console.log('Clicked on "No, thank you" button');
    } catch (err) {
      console.log('"No, thank you" button not found or already handled.');
    }

    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll("#container-film ul li a");
      return Array.from(ScrapeList).map((Scrape) => {
        let href = Scrape.getAttribute("href");
        const title = Scrape.querySelector(".dcr-f9aim1 .dcr-1q9v79k .dcr-147a5s0 h3 span")?.innerText || "No title found";
        if (!href.startsWith("http")) {
          href = `https://www.theguardian.com${href}`;
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
      waitUntil: "load",
      timeout: 180000 ,
    });

    const content = await page.evaluate(() => {
      const ScrapeList = document.querySelector("article .dcr-1upb05m");
      return ScrapeList ? ScrapeList.innerHTML : "Content not found";
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
