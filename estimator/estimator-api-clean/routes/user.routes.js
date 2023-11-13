const Router = require('express');
const router = new Router();

const UserController = require('../controllers/user.controller');
const {verifyToken} = require('../midlewares/auth.midleware');

router.get('/users', UserController.getAllUsers);
router.post('/users', verifyToken, UserController.createUser);
router.delete('/users/:id', verifyToken, UserController.deleteUser);

module.exports = router;