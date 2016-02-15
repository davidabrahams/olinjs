var mongoose = require('mongoose')
  , Schema = mongoose.Schema

// Create a Schema
var Twot = Schema({
  text: String,
  account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model("Twot", Twot);
