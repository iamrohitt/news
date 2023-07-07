const express = require("express");
const router = express.Router();
const newsController = require("../Controllers/NewsController"); // Import the NewsController
const { authMiddleware } = require("../Middlewares/AuthMiddleware");

router.get("/related", authMiddleware, newsController.getAllRelatedNews);

module.exports = router;