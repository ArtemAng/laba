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
      const searchQuery = 'SELECT "email" FROM "employees" WHERE "email" = $1';
      const employee = await db.query(searchQuery, [req.body.email]);
      if (employee.rows.length) {
        return res.status(409).json({message: 'Employee already exists'});
      }
      const newemployee = await db.query(query, [email, firstName, lastName, programmingLevel, age, pricePerHour]);
      
      res.json({email, firstName, lastName, programmingLevel, age, pricePerHour});
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }
  
  async deleteEmployee(req, res) {
    try{
      const employeeId = req.params.id;
      const searchQuery = 'SELECT "email", "firstName", "lastName", "programmingLevel", "age", "pricePerHour" FROM "employees" WHERE "id" = $1';
      const employee = await db.query(searchQuery, [employeeId]);
      if (!employee.rows.length) {
        return res.status(404).json({message: 'Employee not found'});
        // throw new Error('Employee not found');
      }
      const query = 'DELETE FROM "employees" WHERE "id" = $1';
      const deletedEmployee = await db.query(query, [employeeId]);
      res.json(employee.rows[0]);
    } catch (e){
      res.status(500).json({message: e.message})
    }
  }
}

module.exports = new EmployeeController();