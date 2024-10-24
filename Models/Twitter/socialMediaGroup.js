const mongoose = require("mongoose");

// Define the schema
const SocialMediaGroupsSchema = new mongoose.Schema({
  group_name: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  group_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subscribers: {
    type: Number,
    required: true,
    default: 0,
  },
  niche: {
    type: String,
    required: false,
    trim: true,
  },

  platform: {
    type: String,
    required: true,
    enum: ["TWITTER", "FACEBOOK", "LINKEDIN", "REDDIT", "TELEGRAM"],
    default: "TWITTER",
  },

  brand: {
    type: String,
    required: true,
    trim: true,
  },

  engagement: {
    type: Number,
    required: false,
    default: 0,
  },

  personal: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// Create the model
const SocialMediaGroupsModel = mongoose.model(
  "socialmediagroups",
  SocialMediaGroupsSchema
);

// socialAccountSchema   socialAccountModel

module.exports = SocialMediaGroupsModel;
