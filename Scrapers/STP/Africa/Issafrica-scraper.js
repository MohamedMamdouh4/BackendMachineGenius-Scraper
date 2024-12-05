const scrapeURLs = async (page) => {
  try {
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".body-container a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.querySelector("h6")?.innerText || "";
        
        if (href) {
          if (!href.startsWith('http')) {
            href = `https://issafrica.org${href}`;
          }
          return { href, title };
        }
        
        return null;  // Return null if href is invalid
      }).filter(Boolean);  // Filter out any null values
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
      timeout: 180000 
    });

    const content = await page.evaluate(() => {
      const ScrapeList = document.querySelector("article");
      return (ScrapeList.innerHTML);
    });

    return content;
  } catch (error) {
    console.error(`Error during content scraping from ${url}:`, error);
    throw error;
  }
};

module.exports = {
  scrapeURLs,
  scrapeContentFromURL
};
