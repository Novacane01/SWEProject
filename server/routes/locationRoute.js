const router = require('express').Router(),
    location = require('../controllers/locationController');

router.get('/',(req,res)=>{
    res.json(location.locations);
});

module.exports = router;