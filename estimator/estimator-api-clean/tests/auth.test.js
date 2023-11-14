const { db } = require('../db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const AuthController = require('../controllers/auth.controller');

jest.mock('../db');
describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('sign', () => {
    it('should sign a user and return a token', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'testpassword',
        firstName: 'Test',
        lastName: 'User',
      };

      const mockSignature = 'mockSignature';

      const mockCreateHmac = jest
        .spyOn(crypto, 'createHmac')
        .mockReturnValue({ update: jest.fn().mockReturnThis(), digest: jest.fn().mockReturnValue(mockSignature) });

      const mockJson = jest.fn();
      jest.spyOn(Buffer, 'from').mockReturnValue('mockBuffer');

      const result = await AuthController.sign(mockUser);

      expect(mockCreateHmac).toHaveBeenCalledWith('sha256', 'secret');
      expect(mockJson).not.toHaveBeenCalled();
      expect(result).toEqual({ token: 'mockBuffer.mockBuffer.mockSignature' });
    });

    it('should return null if signing fails', async () => {
      const mockUser = {
        email: 'test@example.com',
        password: 'testpassword',
        firstName: 'Test',
        lastName: 'User',
      };

      const mockError = new Error('Signing failed');

      const mockCreateHmac = jest.spyOn(crypto, 'createHmac').mockImplementation(() => {
        throw mockError;
      });

      const result = await AuthController.sign(mockUser);

      expect(mockCreateHmac).toHaveBeenCalledWith('sha256', 'secret');
      expect(result).toBeNull();
    });
  });

  describe('signIn', () => {
    it('should sign in a user and return a token', async () => {
      const mockReq = {
        body: {
          email: 'test@example.com',
          password: 'testpassword',
        },
      };

      const mockUser = {
        email: 'test@example.com',
        password: bcrypt.hashSync('testpassword', 7),
        firstName: 'Test',
        lastName: 'User',
      };

      const mockDbQuery = jest.spyOn(db, 'query').mockResolvedValue({ rows: [mockUser] });
      const mockSign = jest.spyOn(AuthController, 'sign').mockReturnValue({ token: 'mockToken' });
      const mockJson = jest.fn();

      const mockRes = {
        json: mockJson,
        status: jest.fn().mockReturnThis(),
      };

      await AuthController.signIn(mockReq, mockRes);

      expect(mockDbQuery).toHaveBeenCalledWith(
        'SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1',
        ['test@example.com']
      );
      expect(mockSign).toHaveBeenCalledWith(mockUser);
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return an error "User not found" for non-existent user', async () => {
      const mockReq = {
        body: {
          email: 'nonexistent@example.com',
          password: 'testpassword',
        },
      };

      const mockDbQuery = jest.spyOn(db, 'query').mockResolvedValue({ rows: [] });
      const mockJson = jest.fn();

      const mockRes = {
        json: mockJson,
        status: jest.fn().mockReturnThis(),
      };

      await AuthController.signIn(mockReq, mockRes);

      expect(mockDbQuery).toHaveBeenCalledWith(
        'SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1',
        ['nonexistent@example.com']
      );
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return an error "Invalid password or email" for incorrect password', async () => {
      const mockReq = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword',
        },
      };

      const mockUser = {
        email: 'test@example.com',
        password: bcrypt.hashSync('testpassword', 7),
        firstName: 'Test',
        lastName: 'User',
      };

      const mockDbQuery = jest.spyOn(db, 'query').mockResolvedValue({ rows: [mockUser] });
      const mockJson = jest.fn();

      const mockRes = {
        json: mockJson,
        status: jest.fn().mockReturnThis(),
      };

      await AuthController.signIn(mockReq, mockRes);

      expect(mockDbQuery).toHaveBeenCalledWith(
        'SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1',
        ['test@example.com']
      );
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid password or email' });
    });
  });

  describe('signUp', () => {
    it('should sign up a new user and return a token', async () => {
      const mockReq = {
        body: {
          email: 'newuser@example.com',
          password: 'newpassword',
          firstName: 'New',
          lastName: 'User',
        },
      };

      const mockUser = {
        email: 'newuser@example.com',
        password: bcrypt.hashSync('newpassword', 7),
        firstName: 'New',
        lastName: 'User',
      };

      const mockDbQuery = jest.spyOn(db, 'query').mockResolvedValue({ rows: [] });
      const mockHashSync = jest.spyOn(bcrypt, 'hashSync').mockReturnValue(mockUser.password);
      const mockSign = jest.spyOn(AuthController, 'sign').mockReturnValue({ token: 'mockToken' });
      const mockJson = jest.fn();

      const mockRes = {
        json: mockJson,
        status: jest.fn().mockReturnThis(),
      };

      await AuthController.signUp(mockReq, mockRes);

      expect(mockDbQuery).toHaveBeenCalledWith(
        'SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1',
        ['newuser@example.com']
      );
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockHashSync).toHaveBeenCalledWith('newpassword', 7);
      expect(mockSign).toHaveBeenCalledWith({ email: mockUser.email, password: mockUser.password });
      expect(mockJson).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return an error "User already exists" for existing user', async () => {
      const mockReq = {
        body: {
          email: 'existinguser@example.com',
          password: 'existingpassword',
          firstName: 'Existing',
          lastName: 'User',
        },
      };

      const mockUser = {
        email: 'existinguser@example.com',
        password: bcrypt.hashSync('existingpassword', 7),
        firstName: 'Existing',
        lastName: 'User',
      };

      const mockDbQuery = jest.spyOn(db, 'query').mockResolvedValue({ rows: [mockUser] });
      const mockJson = jest.fn();

      const mockRes = {
        json: mockJson,
        status: jest.fn().mockReturnThis(),
      };

      await AuthController.signUp(mockReq, mockRes);

      expect(mockDbQuery).toHaveBeenCalledWith(
        'SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1',
        ['existinguser@example.com']
      );
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: 'User already exists' });
    });
  });
});