const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    Rating: { type: Number, required: [true, "Rating is required."] },
    Comment: { type: String, required: [true, "Comment is required."] },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Rating = mongoose.model("rating", ratingSchema);

module.exports = Rating;