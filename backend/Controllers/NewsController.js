const Related = require("../Models/NewsModel"); // Import the Related model

exports.getAllRelatedNews = async (req, res) => {
    Related.find({})
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching data from MongoDB:', error);
            res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
        });
};
