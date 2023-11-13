const Router = require('express');
const router = new Router();

const ProjectController = require('../controllers/project.controller');
const {verifyToken} = require('../midlewares/auth.midleware');

router.get('/projects', ProjectController.getAllProjects);
router.post('/projects', verifyToken, ProjectController.createProject);
router.post('/projects/:id', verifyToken, ProjectController.addEmployeeToProject);
router.get('/projects/:id', verifyToken, ProjectController.calculateCost);
router.delete('/projects/:id', verifyToken, ProjectController.deleteProject);

module.exports = router;