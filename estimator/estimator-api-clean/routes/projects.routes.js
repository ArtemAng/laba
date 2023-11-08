const Router = require('express');
const router = new Router();

const ProjectController = require('../controllers/project.controller');


router.get('/projects', ProjectController.getAllProjects);
router.post('/projects', ProjectController.createProject);
router.post('/projects/:id', ProjectController.addEmployeeToProject);
router.get('/projects/:id', ProjectController.calculateCost);

module.exports = router;