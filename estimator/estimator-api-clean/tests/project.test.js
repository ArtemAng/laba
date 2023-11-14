const ProjectController = require('../controllers/project.controller');
const { db } = require('../db');

jest.mock('../db');

describe('ProjectController', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('getAllProjects', () => {
    it('should return all projects', async () => {
      const expectedProjects = [
        {
          id: 1,
          name: 'Project 1',
          hours: 10,
          owner: {
            email: 'owner@example.com',
            firstName: 'John',
            lastName: 'Doe',
          },
          employees: [
            {
              email: 'employee@example.com',
            }
          ],
        },
      ];

      jest.spyOn(db, 'query').mockResolvedValue({ rows: expectedProjects });

      await ProjectController.getAllProjects(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedProjects);
    });

  });

  describe('addEmployeeToProject', () => {
    it('should add employee to project', async () => {
      const projectId = 1;
      const employeeId = 1;
      req.params = { id: projectId };
      req.body = { employeeId };

      await ProjectController.addEmployeeToProject(req, res);

      const returnedObj = {
        "employees": [
          {
            "email": "employee@example.com",
          },
        ],
        hours: 10,
        id: 1,
        name: "Project 1",
        owner: {
          email: "owner@example.com",
          firstName: "John",
          lastName: "Doe",
        },
      }
      expect(res.json).toHaveBeenCalledWith(returnedObj);
    });

  });

  describe('createProject', () => {
    test('should create a new project if it does not exist', async () => {
      const mockDbQuery = jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com', password: 'test', firstName: 'John', lastName: 'Doe' }] }).mockResolvedValueOnce({ rows: [] }).mockResolvedValueOnce({ rows: [{ id: 1 }] });
      const req = { body: { name: 'New Project', ownerEmail: 'test@example.com', hours: 10 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProjectController.createProject(req, res);

      expect(res.json).toHaveBeenCalledWith({
        name: 'New Project',
        hours: 10,
        owner: { email: 'test@example.com', firstName: 'John', lastName: 'Doe' },
      });

      expect(mockDbQuery).toHaveBeenCalledWith('SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1', ['test@example.com']);
      expect(mockDbQuery).toHaveBeenCalledWith('SELECT "id", "name" FROM "projects" WHERE "name" = $1', ['New Project']);
      expect(mockDbQuery).toHaveBeenCalledWith('INSERT INTO "projects" ("name", "hours", "ownerId") VALUES ($1, $2, $3) ', ['New Project', 10, 1]);

      mockDbQuery.mockRestore();
    });

    test('should return "Project already exists" if project already exists', async () => {
      const mockDbQuery = jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ id: 1, email: 'test@example.com', password: 'test', firstName: 'John', lastName: 'Doe' }] }).mockResolvedValueOnce({ rows: [{ id: 1 }] });
      const req = { body: { name: 'Existing Project', ownerEmail: 'test@example.com', hours: 10 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProjectController.createProject(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ message: 'Project already exists' });

      expect(mockDbQuery).toHaveBeenCalledWith('SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1', ['test@example.com']);
      expect(mockDbQuery).toHaveBeenCalledWith('SELECT "id", "name" FROM "projects" WHERE "name" = $1', ['Existing Project']);
      mockDbQuery.mockRestore();
    });
  });

  describe('calculateCost', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should calculate cost correctly', async () => {
      const expectedCost = 350;

      db.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          name: 'Test Project',
          hours: 10,
          employees: [
            {
              email: 'test1@example.com',
              firstName: 'John',
              lastName: 'Doe',
              pricePerHour: 20,
              programmingLevel: 'Intermediate',
            },
            {
              email: 'test2@example.com',
              firstName: 'Jane',
              lastName: 'Smith',
              pricePerHour: 15,
              programmingLevel: 'Advanced',
            },
          ],
        }],
      });

      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
      };

      await ProjectController.calculateCost(req, res);

      expect(res.json).toHaveBeenCalledWith({ cost: expectedCost });
    });

    it('should return error message if project does not exist', async () => {
      const expectedErrorMessage = 'Project with this id does not exist';

      db.query.mockResolvedValueOnce({
        rows: [],
      });

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProjectController.calculateCost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: expectedErrorMessage });
    });

    it('should handle database error', async () => {
      const expectedErrorMessage = 'Database error';

      db.query.mockRejectedValueOnce(new Error('Database error'));

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProjectController.calculateCost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: expectedErrorMessage });
    });
  });



  describe('deleteProject', () => {
    it('should delete project and return deleted project data', async () => {
      db.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            name: 'Test Project',
            hours: 10,
          },
        ],
      });

      db.query.mockResolvedValueOnce({});

      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
      };

      await ProjectController.deleteProject(req, res);

      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Test Project', hours: 10 });
    });

    it('should return "Project not found" if project does not exist', async () => {
      db.query.mockResolvedValueOnce({
        rows: [],
      });

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProjectController.deleteProject(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Project not found' });
    });

    it('should handle database error', async () => {
      db.query.mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            name: 'Test Project',
            hours: 10,
          },
        ],
      });

      db.query.mockRejectedValueOnce(new Error('Database error'));

      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProjectController.deleteProject(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});