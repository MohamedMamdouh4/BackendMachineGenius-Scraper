const { text } = require("body-parser");
const { Types } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapedSchema = new Schema({
  url: {
    type: String,
    unique: false,
    required: false,
  },
  title: {
    type: String,
    unique: false,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  time: {
    type: Number,
    required: false,
  },
  brand_id: {
    type: Types.ObjectId,
    required: true,
    ref: "brands_collection",
  },
  brandName: {
    type: String,
    required: false,
  },
  stock: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Scraped", scrapedSchema);
