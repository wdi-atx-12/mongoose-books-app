var mongoose = require("mongoose");

require('dotenv').config()

mongoose.connection.openUri(process.env.DB_CONN);

// add exports here
module.exports.Book = require("./book.js");
// module.exports.Gargoyle = require("./gargoyle.js");
// module.exports.Goblin = require("./goblin.js");
// module.exports.Gnome = require("./gnome.js");
