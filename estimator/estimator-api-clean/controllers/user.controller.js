const {db} = require('../db');

class UserController {
  async getAllUsers(req, res) {
    try{
      const query = 'SELECT "id", "email", "password", "firstName", "lastName" FROM "users"';
      const users = await db.query(query);
      res.json(users.rows)
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }
  
  async createUser(req, res) {
    try{
      const user = req.body;
      const query = 'INSERT INTO "users" ("email", "password", "firstName", "lastName") VALUES ($1, $2, $3, $4) ';
      const values = [user.email, user.password, user.firstName, user.lastName];
      const newUser = await db.query(query, values);
      
      res.json(newUser.rows[0]);
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }

  async deleteUser(req, res) {
    try{
      const userId = req.params.id;
      const query = 'DELETE FROM "users" WHERE "id" = $1';
      const deletedUser = await db.query(query, [userId]);
      res.json(deletedUser.rows[0]);
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }
}

module.exports = new UserController();