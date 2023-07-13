const Related = require("../Models/NewsModel"); // Import the Related model

exports.getAllRelatedNews = async (req, res) => {
    const { start, end, className } = req.query;

    if (className === "Most Upvoted") {
        Related.find()
            .sort({ upvotes: -1, timestamp: -1 })
            .skip(parseInt(start))
            .limit(parseInt(end))
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.error("Error fetching data from MongoDB:", error);
                res.status(500).json({ error: "Failed to fetch data from MongoDB" });
            });
    }
    else if (className === "All") {
        Related.find()
            .sort({ timestamp: -1 })
            .skip(parseInt(start))
            .limit(parseInt(end))
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.error("Error fetching data from MongoDB:", error);
                res.status(500).json({ error: "Failed to fetch data from MongoDB" });
            });
    }
    else if (className === "Most Recent") {
        Related.find()
            .sort({ timestamp: -1 })
            .skip(parseInt(start))
            .limit(parseInt(end))
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.error("Error fetching data from MongoDB:", error);
                res.status(500).json({ error: "Failed to fetch data from MongoDB" });
            });
    }
    else {
        let query = {}; // Define an empty query object

        if (className) {
            query.class = className; // Add the class name to the query if provided
        }
        if (!className) {
            Related.find()
                .sort({ timestamp: -1 })
                .skip(parseInt(start))
                .limit(parseInt(end))
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    console.error("Error fetching data from MongoDB:", error);
                    res.status(500).json({ error: "Failed to fetch data from MongoDB" });
                });
        } else {
            Related.find(query)
                .sort({ timestamp: -1 })
                .skip(parseInt(start))
                .limit(parseInt(end))
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    console.error("Error fetching data from MongoDB:", error);
                    res.status(500).json({ error: "Failed to fetch data from MongoDB" });
                });
        }
    }
};


exports.upvoteNews = async (req, res) => {
    const { itemId } = req.params;
    try {
        // Find the news item with the matching _id
        const newsItem = await Related.findById(itemId);

        if (!newsItem) {
            return res.status(404).json({ error: "News item not found" });
        }

        // Increment or decrement the upvotes count based on the current state
        if (newsItem.upvotedBy.includes(req.user.id)) {
            // If the user has already upvoted, remove their ID from the upvotedBy array and decrement the upvotes count
            req.user.likedNews = req.user.likedNews.filter((id) => id.toString() !== itemId.toString());
            newsItem.upvotedBy = newsItem.upvotedBy.filter((userId) => userId.toString() !== req.user.id.toString());
            newsItem.upvotes -= 1;
        } else {
            // If the user has not upvoted, add their ID to the upvotedBy array and increment the upvotes count
            req.user.likedNews.push(itemId)
            newsItem.upvotedBy.push(req.user.id);
            newsItem.upvotes += 1;
        }

        // Save the updated news item
        await newsItem.save();
        await req.user.save();

        // Return the updated news item in the response
        res.json(newsItem);
    } catch (error) {
        console.error("Error upvoting news:", error);
        res.status(500).json({ error: "Failed to upvote news" });
    }
};

// exports.likeNews = async (req, res) => {
//     try {
//         const { newsId } = req.body;
//         const userId = req.user._id;

//         // Find the user
//         const user = await User.findById(userId);

//         // Check if the user exists
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Update the user's likedNews array with the new newsId
//         user.likedNews.push(newsId);
//         await user.save();

//         res.status(200).json({ message: "News saved successfully" });
//     } catch (error) {
//         console.error("Error saving news:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// exports.unlikeNews = async (req, res) => {
//     try {
//         const { newsId } = req.params;
//         const userId = req.user._id;

//         // Find the user
//         const user = await User.findById(userId);

//         // Check if the user exists
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Remove the newsId from the likedNews array
//         user.likedNews = user.likedNews.filter((id) => id !== newsId);
//         await user.save();

//         res.status(200).json({ message: "News unliked successfully" });
//     } catch (error) {
//         console.error("Error unliking news:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
