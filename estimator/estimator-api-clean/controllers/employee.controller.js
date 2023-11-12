const {db} = require('../db');

class EmployeeController {
  async getAllEmployees(req, res) {
    try{
      const query = 'SELECT "id", "firstName","lastName", "age", "programmingLevel", "pricePerHour" FROM "employees"';
      const employees = await db.query(query);
      res.json(employees.rows)
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }
  
  async createEmployee(req, res) {
    try{
      const {email, firstName, lastName, programmingLevel, age, pricePerHour} = req.body;
      const query = 'INSERT INTO "employees" ("email", "firstName", "lastName", "programmingLevel", "age", "pricePerHour") VALUES ($1, $2, $3, $4, $5, $6) ';
      const newemployee = await db.query(query, [email, firstName, lastName, programmingLevel, age, pricePerHour]);
      
      res.json(newemployee.rows[0]);
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }
  
  async deleteEmployee(req, res) {
    try{
      const employeeId = req.params.id;
      const query = 'DELETE FROM "employees" WHERE "id" = $1';
      const deletedEmployee = await db.query(query, [employeeId]);
      res.json(deletedEmployee.rows[0]);
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }
}

module.exports = new EmployeeController();