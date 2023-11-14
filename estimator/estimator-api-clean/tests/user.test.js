const UserController = require('../controllers/user.controller');
const { db } = require('../db');

jest.mock('../db');
describe('UserController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockReq = {};
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await UserController.getAllUsers(mockReq, mockRes);
      jest.spyOn(db, 'query').mockResolvedValue({ rows: [] });
      expect(mockRes.json).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockReq = {
        body: {
          email: 'test@example.com',
          password: 'test123',
          firstName: 'John',
          lastName: 'Doe',
        },
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      jest.spyOn(db, 'query').mockResolvedValue({ rows: [] });
      await UserController.createUser(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      });
    });

    it('should return an error if user already exists', async () => {
      const mockReq = {
        body: {
          email: 'existing@example.com',
          password: 'test123',
          firstName: 'Jane',
          lastName: 'Doe',
        },
      };
      jest.spyOn(db, 'query').mockResolvedValue({ rows: [{ email: 'existing@example.com' }] });
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await UserController.createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const mockReq = {
        params: { id: 1 },
      };
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await UserController.deleteUser(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalled();
    });

    it('should return an error if user not found', async () => {
      const mockReq = {
        params: { id: 999 },
      };

      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      jest.spyOn(db, 'query').mockResolvedValue({ rows: [] });
      await UserController.deleteUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });
});