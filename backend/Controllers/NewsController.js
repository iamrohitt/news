const Related = require("../Models/NewsModel"); // Import the Related model

exports.getAllRelatedNews = async (req, res) => {
    const { start, end } = req.query;

    Related.find({})
        .sort({ timestamp: -1 }) // Sort documents in descending order based on the timestamp
        .skip(parseInt(start))
        .limit(parseInt(end))
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error("Error fetching data from MongoDB:", error);
            res.status(500).json({ error: "Failed to fetch data from MongoDB" });
        });
};
