const userController = require('../controllers/userController'), 
    router = require('express').Router();


router.route('/').post(userController.addUser);

router.route('/:username')
  .get(userController.getUser)
  .delete(userController.deleteUser);
  
router.route('/login/:username').get(userController.authUser);
module.exports = router;