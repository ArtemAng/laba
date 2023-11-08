const Router = require('express');
const router = new Router();

const AuthController = require('../controllers/auth.controller');

router.post('/auth/signin', AuthController.signIn);
router.post('/auth/signup', AuthController.signUp);

module.exports = router;