const mongoose = require("mongoose");

const relatedSchema = new mongoose.Schema({
    title: String,
    timestamp: Date,
    twitterUrl: String,
    upvotes: Number,
    upvotedBy: {
        type: [mongoose.Schema.Types.ObjectId],  // Assuming upvotedBy stores user ObjectId(s)
    },
});

module.exports = mongoose.model('related', relatedSchema);