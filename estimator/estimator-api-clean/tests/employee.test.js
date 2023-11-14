const employeeController = require('../controllers/employee.controller');
const { db } = require('../db');

jest.mock('../db');

describe('EmployeeController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('getAllEmployees', () => {
    it('should return all employees', async () => {
      const mockDbQuery = jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ id: 1, firstName: 'John', lastName: 'Doe', age: 30, programmingLevel: 'Intermediate', pricePerHour: 50 }] });

      const mockJson = jest.fn();
      const mockRes = { json: mockJson };

      await employeeController.getAllEmployees({}, mockRes);

      expect(mockDbQuery).toHaveBeenCalledWith('SELECT "id", "firstName","lastName", "age", "programmingLevel", "pricePerHour" FROM "employees"');
      expect(mockJson).toHaveBeenCalledWith([{ id: 1, firstName: 'John', lastName: 'Doe', age: 30, programmingLevel: 'Intermediate', pricePerHour: 50 }]);
    });
  });

  describe('createEmployee', () => {
    it('should create a new employee with valid input data', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const mockReq = { body: { email: 'test@example.com', firstName: 'John', lastName: 'Doe', programmingLevel: 'Intermediate', age: 30, pricePerHour: 50 } };
      const mockJson = jest.fn();
      const mockRes = { json: mockJson };

      await employeeController.createEmployee(mockReq, mockRes);

      expect(db.query).toHaveBeenCalledWith('SELECT "email" FROM "employees" WHERE "email" = $1', ['test@example.com']);
      expect(db.query).toHaveBeenCalledWith('INSERT INTO "employees" ("email", "firstName", "lastName", "programmingLevel", "age", "pricePerHour") VALUES ($1, $2, $3, $4, $5, $6) ', ['test@example.com', 'John', 'Doe', 'Intermediate', 30, 50]);
      expect(mockJson).toHaveBeenCalledWith({ email: 'test@example.com', firstName: 'John', lastName: 'Doe', programmingLevel: 'Intermediate', age: 30, pricePerHour: 50 });
    });

    it('should return an error if the employee already exists', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ email: 'test@example.com' }] });

      const mockReq = { body: { email: 'test@example.com', firstName: 'John', lastName: 'Doe', programmingLevel: 'Intermediate', age: 30, pricePerHour: 50 } };
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const mockRes = { status: mockStatus, json: mockJson };

      await employeeController.createEmployee(mockReq, mockRes);

      expect(db.query).toHaveBeenCalledWith('SELECT "email" FROM "employees" WHERE "email" = $1', ['test@example.com']);
      expect(mockStatus).toHaveBeenCalledWith(409);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Employee already exists' });
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an existing employee', async () => {
      db.query.mockResolvedValueOnce({ rows: [{ email: 'test@example.com', firstName: 'John', lastName: 'Doe', programmingLevel: 'Intermediate', age: 30, pricePerHour: 50 }] });

      const mockReq = { params: { id: 1 } };
      const mockJson = jest.fn();
      const mockRes = { json: mockJson };

      await employeeController.deleteEmployee(mockReq, mockRes);

      expect(db.query).toHaveBeenCalledWith('SELECT "email", "firstName", "lastName", "programmingLevel", "age", "pricePerHour" FROM "employees" WHERE "id" = $1', [1]);
      expect(db.query).toHaveBeenCalledWith('DELETE FROM "employees" WHERE "id" = $1', [1]);
      expect(mockJson).toHaveBeenCalledWith({ email: 'test@example.com', firstName: 'John', lastName: 'Doe', programmingLevel: 'Intermediate', age: 30, pricePerHour: 50 });
    });

    it('should return an error if the employee to be deleted does not exist', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const mockReq = { params: { id: 1 } };
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const mockRes = { status: mockStatus, json: mockJson };

      await employeeController.deleteEmployee(mockReq, mockRes);

      expect(db.query).toHaveBeenCalledWith('SELECT "email", "firstName", "lastName", "programmingLevel", "age", "pricePerHour" FROM "employees" WHERE "id" = $1', [1]);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Employee not found' });
    });
  });
})
