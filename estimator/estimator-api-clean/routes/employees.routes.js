const Router = require('express');
const router = new Router();

const EmployeeController = require('../controllers/employee.controller');
const {verifyToken} = require('../midlewares/auth.midleware');

router.get('/employees', EmployeeController.getAllEmployees);
router.post('/employees', verifyToken, EmployeeController.createEmployee);
router.delete('/employees/:id', verifyToken, EmployeeController.deleteEmployee);

module.exports = router;