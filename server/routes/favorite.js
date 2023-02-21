const express = require('express');
const { Favorite } = require('../models/Favorite');
const router = express.Router();


router.post('/getIsFavorite', (req, res) => {

    const { movieId, userFrom } = req.body;
    
    Favorite.findOne({ 'movieId': movieId, 'userFrom': userFrom })
            .exec((err, result) => {
                if(err) return res.status(400).send(err);                

                return res.status(200).json({ getIsFavoriteSuccess: result ? true : false });
            });

    // Favorite.find({ 'movieId': movieId, 'userFrom': userFrom })
    // .exec((err, result) => {
    //     if(err) return res.status(400).send(err);
        
    //     return res.status(200).json({ getIsFavoriteSuccess: true, favorited: result.length !== 0 });
    // });
});


router.post('/getFavoriteCount', (req, res) => {
    
    const { movieId } = req.body;
    Favorite.find({ 'movieId': movieId })
            .exec((err, result) => {
                if(err) return res.status(400).send(err);

                return res.status(200).json({ getFavoriteCountSuccess: true, count: result.length });
            })
});


router.post('/getFavorites', (req, res) => {

    const { userFrom } = req.body;
    Favorite.find({ 'userFrom': userFrom })
            .exec((err, results) => {
                if(err) return res.status(400).send(err);

                return res.status(200).json({ getFavoritesSuccess: true, results });
            });
});


router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body);
    console.log(favorite);
    favorite.save((err, result) => {
        if(err) return res.status(400).send(err);

        return res.status(200).json({ addFavoriteSuccess: true });
    });
});


router.post('/cancelToFavorite', (req, res) => {

    const { movieId, userFrom } = req.body;
    Favorite.findOneAndDelete({ 'movieId': movieId, 'userFrom': userFrom })
            .exec((err, result) => {
                if(err) return res.status(400).send(err);
                console.log(result);
                return res.status(200).json({ cancelFavoriteSuccess: true, result });
            });
});


// router.post('/removeFromFavorite', (req, res) => {

//     const { movieId, userFrom } = req.body;

//     Favorite.findOneAndDelete({  })
// });


module.exports = router;