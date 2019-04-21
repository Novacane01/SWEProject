const router = require('express').Router();
const locations = require('../controllers/locationController');

router.get('/',(req,res)=>{
    res.json(locations);
});

module.exports = router;