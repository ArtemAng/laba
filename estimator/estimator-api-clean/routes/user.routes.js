const Router = require('express');
const router = new Router();

const UserController = require('../controllers/user.controller');

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);

module.exports = router;