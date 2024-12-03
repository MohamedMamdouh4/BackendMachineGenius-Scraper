
const scrapeURLs = async (page) => {
  try {
    await page.goto("https://www.africanews.com/news/", {
      waitUntil: "load",
      timeout: 120000
    });
    const URLs = await page.evaluate(() => {
      const ScrapeList = document.querySelectorAll(".layout.theme-block__spacer.jsArticleList h3 a");
      return Array.from(ScrapeList).map(Scrape => {
        let href = Scrape.getAttribute("href");
        let title = Scrape.innerText || "";
        
        if (href) {
          if (!href.startsWith('http')) {
            href = `https://www.africanews.com${href}`;
            
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
      timeout: 120000
    });

    const content = await page.evaluate(() => {
      const ScrapeList = document.querySelector(".article-content__text");
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
