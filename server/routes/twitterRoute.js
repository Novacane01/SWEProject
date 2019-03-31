const twitterController = require('../controllers/twitterController'), 
    router = require('express').Router();

router.route('/location/:loc').get(twitterController.findCountryByName);

module.exports = router;