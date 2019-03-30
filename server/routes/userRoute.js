const userController = require('../controllers/userController'), 
    router = require('express').Router();



router.route('/:username')
  .get(userController.getUser)
  .delete(userController.deleteUser);
  
router.route('/login').get(userController.authUser);
router.route('/register').post(userController.addUser);
module.exports = router;