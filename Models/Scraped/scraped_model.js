const { text } = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrapedSchema = new Schema({
  url:
  {
    type: String,
    unique: false,
    required: false, 
  },
  title:
  {
    type: String,
    unique: false,
    required: false, 
  },
  content: 
  {
    type: String,
    required: false 
  },
  date: 
  {
    type: String, 
    required: false
  },
  time: 
  {
    type: Number, 
    required: false
  },
  brand:
  {
    type: String,
    required: true
  },
  stock:
  {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Scraped', scrapedSchema);