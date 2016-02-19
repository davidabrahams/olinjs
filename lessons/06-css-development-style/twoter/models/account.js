var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Create a Schema
var Account = mongoose.Schema({
    username: String,
    password: String,
  facebook         : {
        id           : String,
        name         : String
    },
  twotes : [{ type: Schema.Types.ObjectId, ref: 'Twote' }]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model("Account", Account);
