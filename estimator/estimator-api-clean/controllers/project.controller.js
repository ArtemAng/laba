const {db} = require('../db');

class ProjectController {
  async getAllProjects(req, res) {
    try{
      const query = `
      SELECT 
      "projects"."id", 
      "projects"."name", 
      "projects"."hours", 
      JSON_BUILD_OBJECT(
       'email', "users"."email",
       'firstName', "users"."firstName",
       'lastName', "users"."lastName"
      ) as "owner",
      ARRAY_AGG( JSON_BUILD_OBJECT(
        'email', "employees"."email",
        'firstName', "employees"."firstName",
        'lastName', "employees"."lastName",
        'pricePerHour', "employees"."pricePerHour",
        'programmingLevel', "employees"."programmingLevel"
      ) ) as "employeeEmails"
    FROM 
      "projects" 
      LEFT JOIN "users" ON "projects"."ownerId" = "users"."id"
      LEFT JOIN "project_employees" ON "projects"."id" = "project_employees"."projectId"
      LEFT JOIN "employees" ON "project_employees"."employeeId" = "employees"."id"
    GROUP BY 
      "projects"."id", 
      "projects"."name", 
      "projects"."hours", 
      "users"."email", 
      "users"."firstName", 
      "users"."lastName"
    ORDER BY 
      "projects"."id" DESC
      `;
      const projects = await db.query(query);
      res.json(projects.rows)
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }
  async addEmployeeToProject(req, res) {
    try{
      const projectId = req.params.id;
      const {employeeId} = req.body;
      const query = 'INSERT INTO "project_employees" ("projectId", "employeeId") VALUES ($1, $2) ';
      const newEmployee = await db.query(query, [projectId, employeeId]);
      res.json(newEmployee.rows[0]);
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }
  async createProject(req, res) {
    try{
      const {name, ownerEmail, hours} = req.body;
      const owner = await db.query('SELECT "id", "email", "password", "firstName", "lastName" FROM "users" WHERE "email" = $1', [ownerEmail]);
      const query = 'INSERT INTO "projects" ("name", "hours", "ownerId") VALUES ($1, $2, $3) ';
      const newProject = await db.query(query, [name, hours, owner.rows[0].id]);
      res.json(newProject.rows[0]);
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }

  async calculateCost (req, res) {
    try{
      const projectId = req.params.id;
      const query = `
      SELECT 
      "projects"."id", 
      "projects"."name", 
      "projects"."hours", 
      
      ARRAY_AGG( JSON_BUILD_OBJECT(
        'email', "employees"."email",
        'firstName', "employees"."firstName",
        'lastName', "employees"."lastName",
        'pricePerHour', "employees"."pricePerHour",
        'programmingLevel', "employees"."programmingLevel"
      ) ) as "employees"
    FROM 
      "projects" 
      LEFT JOIN "users" ON "projects"."ownerId" = "users"."id"
      LEFT JOIN "project_employees" ON "projects"."id" = "project_employees"."projectId"
      LEFT JOIN "employees" ON "project_employees"."employeeId" = "employees"."id"

    WHERE "projects"."id" = $1
    GROUP BY 
      "projects"."id", 
      "projects"."name", 
      "projects"."hours", 
      "users"."email", 
      "users"."firstName", 
      "users"."lastName"
    ORDER BY 
      "projects"."id" DESC
      `;
      const project = await db.query(query, [projectId]);
      if(!project.rows.length) {
        throw new Error('Project with this id does not exist');
      }

      const employees = project.rows[0].employees;
      const cost = employees.reduce((acc, cur) => acc + cur.pricePerHour, 0) * project.rows[0].hours;

      res.json({cost});
      
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }

  async deleteProject(req, res) {
    try{
      const projectId = req.params.id;
      const query = 'DELETE FROM "projects" WHERE "id" = $1';
      const deletedProject = await db.query(query, [projectId]);
      res.json(deletedProject.rows[0]);
    } catch (e){
      res.status(400).json({message: e.message})
    }
  }
}

module.exports = new ProjectController();