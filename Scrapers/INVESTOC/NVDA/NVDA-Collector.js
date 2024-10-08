const puppeteer = require('puppeteer');
const FoolScrape = require('./NVDA-FOOLScrpers');
const InvetorScrape = require('./NVDA-InvplaceScrappers');
const TweaktownScrape = require('./NVDA-TweaktownScraper');
const BenzingaScrape = require('./NVDA-BenzingaScraper');
const CnbcScrape = require('./NVDA-CnbcScrapers');


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

    try {
        const URLs = await FoolScrape.scrapeURLs(page);
        const allContent = [];
        for (let { href, title } of URLs) {
            console.log(`Scraping content from: ${href}`);
            try 
            {
                const content = await FoolScrape.scrapeContentFromURL(page, href);
                if(title && content && content!== "Error fetching content" )
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

    try {
        const URLs = await InvetorScrape.scrapeURLs(page);
        const allContent = [];
        for (let { href, title } of URLs) {
            console.log(`Scraping content from: ${href}`);
            try 
            {
                const content = await InvetorScrape.scrapeContentFromURL(page, href);
                if(title && content && content!== "Error fetching content" )
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

const scrape_Tweaktown = async () => {
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
        const URLs = await TweaktownScrape.scrapeURLs(page);
        const allContent = [];
        for (let { href, title } of URLs) {
            console.log(`Scraping content from: ${href}`);
            try 
            {
                const content = await TweaktownScrape.scrapeContentFromURL(page, href);
                if(title && content && content!== "Error fetching content" )
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

    try {
        const URLs = await BenzingaScrape.scrapeURLs(page);
        const allContent = [];
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
        return allContent;
    } catch (error) {
        console.error('Error scraping all content:', error);
        throw error;
    } finally {
        await browser.close();
    }
};

const scrape_Cnbc = async () => {
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
        const URLs = await CnbcScrape.scrapeURLs(page);
        const allContent = [];
        for (let { href, title } of URLs) {
            console.log(`Scraping content from: ${href}`);
            try 
            {
                const content = await CnbcScrape.scrapeContentFromURL(page, href);
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

module.exports = {
    scrape_Fool,
    scrape_Investor,
    scrape_Tweaktown,
    scrape_Benzinga,
    scrape_Cnbc
}