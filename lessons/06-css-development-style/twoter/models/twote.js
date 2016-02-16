var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Create a Schema
var Twote = Schema({
  text: String,
  _creator: { type: Schema.Types.ObjectId, ref: "Account" }
});

module.exports = mongoose.model("Twote", Twote);
