const { Schema, model, Types } = require("mongoose");
const GroupsAnalyticsSchema = new Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },

  group_id: {
    type: String,
    required: true,
    trim: true,
  },

  timestamp: {
    type: Number,
    required: true,
    unique:false
  },

  platform: {
    type: String,
    required: true,
    unique:false
  },

  subs: {
    type: Number,
    required: true,
    unique:false
  },

});



const GroupsAnalyticsModel = model("groups_subs", GroupsAnalyticsSchema);
module.exports = GroupsAnalyticsModel
