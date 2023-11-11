const Router = require('express');
const router = new Router();

const EmployeeController = require('../controllers/employee.controller');

router.get('/employees', EmployeeController.getAllEmployees);
router.post('/employees', EmployeeController.createEmployee);
router.delete('/employees/:id', EmployeeController.deleteEmployee);

module.exports = router;