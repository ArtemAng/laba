const {db} = require('../db');

class EmployeeController {
  async getAllEmployees(req, res) {
    try{
      const query = 'SELECT "id", "firstName","lastName", "age", "workExperience", "programmingLevel", "pricePerHour" FROM "employees"';
      const employees = await db.query(query);
      res.json(employees.rows)
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }
  
  async createEmployee(req, res) {
    try{
      const {email, firstName, lastName, programmingLevel, workExperience, age, pricePerHour} = req.body;
      const query = 'INSERT INTO "employees" ("email", "firstName", "lastName", "programmingLevel", "workExperience", "age", "pricePerHour") VALUES ($1, $2, $3, $4, $5, $6, $7) ';
      const newemployee = await db.query(query, [email, firstName, lastName, programmingLevel, workExperience, age, pricePerHour]);
      
      res.json(newemployee.rows[0]);
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }
  
  async deleteEmployee(req, res) {
    try{
      const employeeId = req.params.id;
      const query = 'DELETE FROM "employees" WHERE "id" = $1';
      const deletedEmployee = await db.query(query, [employeeId]);
      res.json(deletedEmployee.rows[0]);
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }
}

module.exports = new EmployeeController();