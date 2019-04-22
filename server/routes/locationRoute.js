const router = require('express').Router();
const locations = require('../controllers/locationController');

router.get('/',(req,res)=>{
    res.status(200).json(locations);
});

module.exports = router;