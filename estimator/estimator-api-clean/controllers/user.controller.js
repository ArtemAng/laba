const {db} = require('../db');

class UserController {
  async getAllUsers(req, res) {
    try{
      const query = 'SELECT "id", "email", "firstName", "lastName" FROM "users"';
      const users = await db.query(query);
      res.json(users.rows)
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }
  
  async createUser(req, res) {
    try{
      const user = req.body;
      const query = 'INSERT INTO "users" ("email", "password", "firstName", "lastName") VALUES ($1, $2, $3, $4) ';
      const searchQuery = 'SELECT "email" FROM "users" WHERE "email" = $1';
      const userExists = await db.query(searchQuery, [user.email]);
      if (userExists.rows.length) {
        return res.status(409).json({message: 'User already exists'});
      }
      const values = [user.email, user.password, user.firstName, user.lastName];
      const newUser = await db.query(query, values);
      
      res.json({email: user.email, firstName: user.firstName, lastName: user.lastName});
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }

  async deleteUser(req, res) {
    try{
      const userId = req.params.id;
      const query = 'DELETE FROM "users" WHERE "id" = $1';
      const searchQuery = 'SELECT "email", "firstName", "lastName" FROM "users" WHERE "id" = $1';
      const user = await db.query(searchQuery, [userId]);
      if (!user.rows.length) {
        return res.status(404).json({message: 'User not found'});
        // throw new Error('User not found');
      }
      const deletedUser = await db.query(query, [userId]);
      res.json(user.rows[0]);
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }
}

module.exports = new UserController();