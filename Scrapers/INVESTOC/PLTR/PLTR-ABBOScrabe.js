const scrapeURLs = async (page) => {
  try {
    await page.goto("https://abbonews.com/?s=pltr", {
      waitUntil: "load",
      timeout: 120000
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".ast-row article h2 a");
      return Array.from(ScrapeList).map(Scrape => {
        var href = Scrape.getAttribute("href");
        let title = Scrape.innerText;
        if (!href.startsWith('http')) {
          href = `https://abbonews.com/${href}`;
        }
        return { href, title };
      });
    });
    console.log("Title and URLS------>" , URLs);
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
      timeout: 120000
    });
    const content = await page.evaluate(() => {
    const ScrapeList = document.querySelector(".entry-content.clear");
      return (ScrapeList.innerHTML);
    });
    return content;
  }
    catch (error) {
      console.error(`Error during content scraping from ${url}:`, error);
      throw error;
    }
};

module.exports = 
{
    scrapeURLs,
    scrapeContentFromURL
}