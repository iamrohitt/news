const mongoose = require("mongoose");

const relatedSchema = new mongoose.Schema({
    title: String,
    timestamp: Date,
    twitterUrl: String,
});

module.exports = mongoose.model('related', relatedSchema);