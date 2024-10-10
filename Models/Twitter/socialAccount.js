const { Schema, model, Types } = require("mongoose");
const socialAccountSchema = new Schema({
  sharingList: {
    type: String,
    required: true,
    enum: ["TWITTER", "FACEBOOK", "LINKEDIN", "REDDIT", "TELEGRAM"],
    default: "TWITTER",
  },
  brand: {
    type: Types.ObjectId,
    ref: "brands_collection",
  },
  userName: {
    type: String,
    required: true,
  },
  accountName: { type: String, required: true },
  accountLink: { type: String, required: true },
  account_id: { type: String, required: true },
  employeeId: {
    type: Types.ObjectId,
    required: true,
    ref: "employee",
  },
  delayBetweenPosts: {
    type: Number,
    default: 1,
  },
  delayBetweenGroups: {
    type: Number,
    default: 1,
  },
  longPauseAfterCount: {
    type: Number,
    default: 1,
  },

  niche: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Paused", "Running"],
    default: "Running",
  },
  comments: { type: Number, default: 0 },
  campaignType: {
    type: String,
    required: true,
    enum: ["Auto Comment", "Must Approve"],
    default: "Auto Comment",
  },
  followers: String,
});

const socialAccountModel = model("socialAccount", socialAccountSchema);
module.exports = {socialAccountModel};
