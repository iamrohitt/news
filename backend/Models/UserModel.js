const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likedNews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewsItem',
    }], // Assuming likedNews stores NewsItem ObjectId
});

userSchema.pre("save", async function () {
    password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
