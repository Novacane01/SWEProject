const userController = require('../controllers/userController'), 
    router = require('express').Router();


router.route('/').post(userController.addUser);

router.route('/:username')
  .get(userController.getUser)
  .delete(userController.deleteUser);
  
module.exports = router;