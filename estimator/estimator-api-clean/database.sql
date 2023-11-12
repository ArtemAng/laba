CREATE TABLE IF NOT EXISTS "users" (
  "id"  SERIAL UNIQUE , 
  "email" VARCHAR(255) NOT NULL UNIQUE, 
  "password" VARCHAR(255) NOT NULL, 
  "firstName" VARCHAR(255) NOT NULL, 
  "lastName" VARCHAR(255) NOT NULL, 
  PRIMARY KEY ("id")
  );

CREATE TABLE IF NOT EXISTS "projects" (
  "id"  SERIAL , 
  "name" VARCHAR(255) NOT NULL, 
  "hours" INTEGER NOT NULL, 
  "ownerId" INTEGER REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE, 
  PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "employees" (
  "id"  SERIAL UNIQUE , 
  "firstName" VARCHAR(255) NOT NULL, 
  "lastName" VARCHAR(255) NOT NULL, 
  "email" VARCHAR(255) NOT NULL UNIQUE, 
  "age" INTEGER NOT NULL, 
  "programmingLevel" VARCHAR(255) NOT NULL, 
  "pricePerHour" INTEGER NOT NULL, 
  PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "project_employees" (
  "id"  SERIAL , 
  "projectId" INTEGER NOT NULL REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
  "employeeId" INTEGER NOT NULL REFERENCES "employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
  PRIMARY KEY ("id")
  );