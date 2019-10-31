var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
    itemName: String,
    createdBy: String
});

module.exports = mongoose.model('List', ListSchema)
