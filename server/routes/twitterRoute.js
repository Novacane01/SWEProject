const twitterController = require('../controllers/twitterController'), 
    router = require('express').Router();

// router.route('/location/:loc').get(twitterController.findCountryByName);
router.route('/trendingAt').get(twitterController.getTrendsAt);
module.exports = router;