const puppeteer = require('puppeteer');
const bbcScrape = require('./Bbc-Scraper');
const independentScrape = require('./Independent-Scraper');
const africanewsScrape = require('./Africanews-Scraper');
const isstodayScraper = require('./Issafrica-scraper');

const sites = 
[
  "https://issafrica.org/iss-today" ,
  "https://issafrica.org/research/africa-report",
  "https://issafrica.org/research/central-africa-report",
  "https://issafrica.org/research/east-africa-report",
  "https://issafrica.org/research/southern-africa-report"
]

const scrapeBbc = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-http2',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--enable-features=NetworkService,NetworkServiceInProcess',
        ]
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    try {
        const URLs = await bbcScrape.scrapeURLs(page);
        const allContent = [];
        for (let { href, title } of URLs) {
            console.log(`Scraping content from: ${href}`);
            try 
            {
                const content = await bbcScrape.scrapeContentFromURL(page, href);
                if(title && content)
                {
                    allContent.push({ url: href, title, content });
                }
            } catch (error) {
                console.error(`Error scraping content from ${href}:`, error);
                allContent.push({ url: href, title, content: 'Error fetching content' });
            }
        }
        return allContent;
    } catch (error) {
        console.error('Error scraping all content:', error);
        throw error;
    } finally {
        await browser.close();
    }
};

const scrapeIndependent = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-http2',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--enable-features=NetworkService,NetworkServiceInProcess',
        ]
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    try {
        const URLs = await independentScrape.scrapeURLs(page);
        const allContent = [];
        for (let { href } of URLs) {
            console.log(`Scraping content from: ${href}`);
            try 
            {
                const content = await independentScrape.scrapeContentFromURL(page, href);
                if(content.content)
                {
                    allContent.push({ url: href, content });
                }
            } catch (error) {
                console.error(`Error scraping content from ${href}:`, error);
                allContent.push({ url: href, content: 'Error fetching content' });
            }
        }
        return allContent;
    } catch (error) {
        console.error('Error scraping all content:', error);
        throw error;
    } finally {
        await browser.close();
    }
};

const scrapeAfricanews = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-http2',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--enable-features=NetworkService,NetworkServiceInProcess',
        ]
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    try {
        const URLs = await africanewsScrape.scrapeURLs(page);
        const allContent = [];
        for (let { href, title } of URLs) {
            console.log(`Scraping content from: ${href}`);
            try 
            {
                const content = await africanewsScrape.scrapeContentFromURL(page, href);
                if(title && content)
                {
                    allContent.push({ url: href, title, content });
                }
            } catch (error) {
                console.error(`Error scraping content from ${href}:`, error);
            }
        }
        return allContent;
    } catch (error) {
        console.error('Error scraping all content:', error);
        throw error;
    } finally {
        await browser.close();
    }
};

const scrapeIssafrica= async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-http2',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--enable-features=NetworkService,NetworkServiceInProcess',
      ]
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
    const allContent = [];
  
    try {
      for (let site of sites) {
        console.log(`Scraping URLs from: ${site}`);
        
        await page.goto(site, {
          waitUntil: "load",
          timeout: 120000
        });
    
        const URLs = await isstodayScraper.scrapeURLs(page);
    
        for (let { href, title } of URLs) {
          console.log(`Scraping content from: ${href}`);
          try {
            const content = await isstodayScraper.scrapeContentFromURL(page, href);
            
            if (title.trim() !== "" && content.trim() !== "") {
              allContent.push({ url: href, title, content });
            }
          } catch (error) {
            console.error(`Error scraping content from ${href}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error scraping all content:', error);
      throw error;
    } finally {
      await browser.close();
    }
  
    return allContent;
};
  
module.exports = {
    scrapeBbc,
    scrapeIndependent,
    scrapeAfricanews,
    scrapeIssafrica
};