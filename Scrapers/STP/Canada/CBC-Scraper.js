const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.cbc.ca/news/politics", {
      waitUntil: "domcontentloaded",
      timeout: 120000
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll("a.card.cardDefault , a.card.cardText , a.card.cardListing.rightImage:not(a.flag-live)");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        const title = Scrape.querySelector("h3").innerText;
        if (!href.startsWith('http')) {
          href = `https://www.cbc.ca${href}`;
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
      waitUntil: "domcontentloaded",
      timeout: 120000
    });
    const content = await page.evaluate(() => {
    const ScrapeList = document.querySelector(".story");
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