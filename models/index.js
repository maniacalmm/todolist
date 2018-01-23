var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect("mongodb://tang:geekbeta@ds111638.mlab.com:11638/tododb7758", function(err) {
    if (!err) console.log("db connected");
});

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
