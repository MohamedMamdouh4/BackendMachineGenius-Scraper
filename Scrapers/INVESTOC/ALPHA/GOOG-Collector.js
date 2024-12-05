const puppeteer = require('puppeteer');
const FoolScrape = require('./GOOG-FOOLScrpers');
const InvetorScrape = require('./GOOG-InvplaceScrappers');
const TweaktownScrape = require('./GOOG-TweaktownScraper');
const BenzingaScrape = require('./GOOG-BenzingaScraper');
const CnbcScrape = require('./GOOG-CnbcScrapers');

const sites_fool = 
[
    "https://www.fool.com/quote/nasdaq/goog/",
    "https://www.fool.com/quote/nasdaq/googl/"
]
const sites_Investor = 
[
    "https://investorplace.com/stock-quotes/goog-stock-quote/",
    "https://investorplace.com/stock-quotes/googl-stock-quote/"
]
const sites_Tweaktown = 
[
]
const sites_Benzinga = 
[
    "https://www.benzinga.com/quote/GOOG/news",
    "https://www.benzinga.com/quote/GOOGL/news"
]


const scrape_Fool = async () => {
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
        for (let site of sites_fool) {
            console.log(`Scraping URLs from: ${site}`);
                    
            await page.goto(site, {
                waitUntil: "load",
                timeout: 180000 
            });
      
            const URLs = await FoolScrape.scrapeURLs(page);            
            for (let { href, title } of URLs) {
                console.log(`Scraping content from: ${href}`);
                try 
                {
                    const content = await FoolScrape.scrapeContentFromURL(page, href);
                    console.log("content------>" , content);
                    if(title && content)
                    {
                        allContent.push({ url: href, title, content });
                    }
                } catch (error) {
                    console.error(`Error scraping content from ${href}:`, error);
                    allContent.push({ url: href, title, content: 'Error fetching content' });
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
const scrape_Investor = async () => {
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
        for (let site of sites_Investor) {
            console.log(`Scraping URLs from: ${site}`);
                    
            await page.goto(site, {
                waitUntil: "load",
                timeout: 180000 
            });
      
            const URLs = await InvetorScrape.scrapeURLs(page);            
            for (let { href, title } of URLs) {
                console.log(`Scraping content from: ${href}`);
                try 
                {
                    const content = await InvetorScrape.scrapeContentFromURL(page, href);
                    console.log("content------>" , content);
                    if(title && content)
                    {
                        allContent.push({ url: href, title, content });
                    }
                } catch (error) {
                    console.error(`Error scraping content from ${href}:`, error);
                    allContent.push({ url: href, title, content: 'Error fetching content' });
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
const scrape_Benzinga = async () => {
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
        for (let site of sites_Benzinga) {
            console.log(`Scraping URLs from: ${site}`);
                    
            await page.goto(site, {
                waitUntil: "load",
                timeout: 180000 
            });
      
            const URLs = await BenzingaScrape.scrapeURLs(page);            
            for (let { href, title } of URLs) {
                console.log(`Scraping content from: ${href}`);
                try 
                {
                    const content = await BenzingaScrape.scrapeContentFromURL(page, href);
                    console.log("content------>" , content);
                    if(title && content)
                    {
                        allContent.push({ url: href, title, content });
                    }
                } catch (error) {
                    console.error(`Error scraping content from ${href}:`, error);
                    allContent.push({ url: href, title, content: 'Error fetching content' });
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
    scrape_Fool,
    scrape_Investor,
    // scrape_Tweaktown,
    scrape_Benzinga,
    // scrape_Cnbc
}