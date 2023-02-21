const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {                      // 누가 좋아하는지
        type: Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieName: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRuntime: {
        type: String
    },
    movieProdCountry: {
        type: String
    },
    releaseDate: {
        type: String
    }
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite };