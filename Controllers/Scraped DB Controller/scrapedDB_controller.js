const scraped_dataBase = require("../../Models/Scraped/scraped_model");
const moment = require('moment-timezone')
moment.tz.setDefault("Africa/Cairo")
require('dotenv/config');

const add_to_scraped = async (title, content, brand) => {
    try {
      const new_scraped = new scraped_dataBase({
        title,
        content,
        brand,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        time: moment().valueOf()
      });
      await new_scraped.save();
  
      const deletionResult = await delete_scraped_fromDB(brand);
  
      return { new_scraped, deletionResult };
    } catch (error) {
      console.error(`Error saving to database: ${error}`);
      throw new Error(`Database save failed: ${error.message}`);
    }
};
  
const delete_scraped_fromDB = async (brandName, stockName) => {
    try {
        const query = { brand: brandName, content: { $in: ["", "Error fetching content"] } };
        if (stockName) {
            query.stock = stockName;
        }
  
        const results = await scraped_dataBase.deleteMany(query);
        return `Deleted ${results.deletedCount} documents with brand: ${brandName} and stock: ${stockName}`;
        
    } catch (error) {
        console.error(`Error in deleting scraped data: ${error}`);
        throw new Error(`Deletion failed: ${error.message}`);
    }
};

const getScrapedData = async (brandName, stockName, session) => {
    try {
        const query = { brand: brandName };
        if (stockName) {
            query.stock = stockName;
        }
        const results = await scraped_dataBase.find(query).session(session).sort({time : -1}).limit(70)
        return results
    } catch (error) {
        console.error("Error occurred:", error);
        throw new Error("Internal Server Error");
    }
};

const get_scraped_fromDB = async (req, res) => {
    try {
        const { brandName, stockName } = req.body;

        const result = await getScrapedData(brandName, stockName);
        return res.status(200).json({ msg: "Scraped DB fetched successfully", result });
    } catch (error) {
        return res.status(500).json({ msg: "Error in fetching scraped DB", error });
    }
};

const delete_data_fromDB = async (req, res) => {
    try {
        const { brandName, stockName } = req.body;
        const query = { brand: brandName };
        if (stockName) {
            query.stock = stockName;
        }

        const results = await scraped_dataBase.deleteMany(query);
        return res
            .status(200)
            .json({ msg: `All documents with brand: ${brandName} and stock: ${stockName} with empty content deleted successfully.`, deletedCount: results.deletedCount });
    } catch (error) {
        return res.status(500).json({ msg: "Error in deleting scraped data", error });
    }
};

/////////////////////



module.exports = { get_scraped_fromDB, getScrapedData, delete_scraped_fromDB, delete_data_fromDB , add_to_scraped};