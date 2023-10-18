# IT Project Estimator

## Description
The IT Project Estimator is a project estimation tool designed for an IT company. Its main purpose is to calculate the cost of a project in person-hours and provide a list of available employees who are not currently assigned to other projects. This system will assist the company in effectively estimating project costs and managing resources.

## Technical Requirements
The IT Project Estimator is built using the following technologies:
- Node.js - a server-side platform for building scalable applications
- Express.js - a fast and minimalist web framework for Node.js
- Postgres - stable and reliable database
- Docker container

## Implementation Details
Base URL
 `http://localhost:2000/api/v1/`

# Endpoints
The IT Project Estimator exposes the following endpoints:
- `/projects` (POST) - Accepts project details and calculates the project's cost in person-hours.
- `/projects` (GET) - Retrieves a list of availible projects.
- `/employees` (POST) - Accepts data about employees and creates new employee.
- `/employees` (GET) - Retrieves a list of available employees without current projects.
- `/users` (POST) - Accepts user's data and creates new user.
- `/users` (GET) - Retrieves a list of registered users.

## Projects

- ### Request: GET `api/v1/projects` - get all projects
- Response:
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json [
        {
            "id": "1",
            "name": "Project X",
            "employes": [
                {
                    "firstName": "Elon",
                    "lastName": "Musk",
                    "email": "elon@x.com",
                    "age": 15
                    "workExperience": 1,
                    "programmingLevel": "Junior",
                    "pricePerHour": 10
                },
                "owner": {
                    "firstName": "Test",
                    "lastName": "User",
                    "email": "test_user@gmail.com",
                }
            ]
        },
		        {
            "id": "2",
            "name": "Youtube",
            "employes": [
                {
                    "firstName": "Peter",
                    "lastName": "Griffin",
                    "email": "pumpkineater@gmail.com",
                    "age": 34
                    "workExperience": 10,
                    "programmingLevel": "Senior",
                    "pricePerHour": 99
                },
				{
                    "firstName": "Stewie",
                    "lastName": "Griffin",
                    "email": "stewie@gmail.com",
                    "age": 1
                    "workExperience": 10,
                    "programmingLevel": "Senior",
                    "pricePerHour": 199
                },
                "owner": {
                    "firstName": "Test",
                    "lastName": "User",
                    "email": "test_user@gmail.com",
                }
            ]
        },
    ]
    ```

- ### Request: GET `api/v1/projects/{projectId}` - get project by id
  
  Query Parameters

  | Parameter | Type   | Required | Description     |
  | --------- | ------ | -------- | --------------- |
  | projectId | string | Yes      | The project ID. |

- Response:
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
	{
		"id": "1",
		"name": "Project X",
		"employes": [
			{
				"firstName": "Elon",
				"lastName": "Musk",
				"email": "elon@x.com",
				"age": 15
				"workExperience": 1,
				"programmingLevel": "Junior",
				"pricePerHour": 10
			},
		]
		"owner": {
			"firstName": "Test",
			"lastName": "User",
			"email": "test_user@gmail.com",
		}
	}
    ```

- ### Request: POST `api/v1/projects/` - create new project
  
  Query Parameters

  | Parameter | Type    | Required | Description       |
  | --------- | ------- | -------- | ----------------- |
  | name      | string  | Yes      | The project name. |
  | employes  | array   | Yes      | The employees ids |
  | owner     | integer | Yes      | The user ID.      |

- Response (returns created project):
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
	{
		"id": "1",
		"name": "New project",
		"employes": [
			{
				"firstName": "Elon",
				"lastName": "Musk",
				"email": "elon@x.com",
				"age": 15
				"workExperience": 1,
				"programmingLevel": "Junior",
				"pricePerHour": 10
			},
		]
		"owner": {
			"firstName": "Test",
			"lastName": "User",
			"email": "test_user@gmail.com",
		}
	}
    ```

- Request: DELETE `api/v1/projects/{projectId}` - delete project by id
  
  Query Parameters

  | Parameter | Type   | Required | Description     |
  | --------- | ------ | -------- | --------------- |
  | projectId | string | Yes      | The project ID. |

- Response (returns deleted project):
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
	{
		"id": "1",
		"name": "Project X",
		"employes": [
			{
				"firstName": "Elon",
				"lastName": "Musk",
				"email": "elon@x.com",
				"age": 15
				"workExperience": 1,
				"programmingLevel": "Junior",
				"pricePerHour": 10
			},
		]
		"owner": {
			"firstName": "Test",
			"lastName": "User",
			"email": "test_user@gmail.com",
		}
	}
## Employees

- ### Request: GET `api/v1/employes` - get all employes
- Response:
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json [
        {
          "firstName": "Elon",
          "lastName": "Musk",
          "email": "elon@x.com",
          "age": 15
          "workExperience": 1,
          "programmingLevel": "Junior",
          "pricePerHour": 10
        },
        {
            "firstName": "Peter",
            "lastName": "Griffin",
            "email": "pumpkineater@gmail.com",
            "age": 34
            "workExperience": 10,
            "programmingLevel": "Senior",
            "pricePerHour": 99
        },
        {
            "firstName": "Stewie",
            "lastName": "Griffin",
            "email": "stewie@gmail.com",
            "age": 1
            "workExperience": 10,
            "programmingLevel": "Senior",
            "pricePerHour": 199
        },
    ]
    ```

- ### Request: GET `api/v1/employes/{employeeID}` - get employee by Id

- Request:
 
  Query parametrs

    | Parameter  | Type    | Required | Description      |
    | ---------- | ------- | -------- | ---------------- |
    | employeeId | integer | Yes      | The employee ID. |
- Response:
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json [
        {
          "firstName": "Elon",
          "lastName": "Musk",
          "email": "elon@x.com",
          "age": 15
          "workExperience": 1,
          "programmingLevel": "Junior",
          "pricePerHour": 10
        },
        {
            "firstName": "Peter",
            "lastName": "Griffin",
            "email": "pumpkineater@gmail.com",
            "age": 34
            "workExperience": 10,
            "programmingLevel": "Senior",
            "pricePerHour": 99
        },
        {
            "firstName": "Stewie",
            "lastName": "Griffin",
            "email": "stewie@gmail.com",
            "age": 1
            "workExperience": 10,
            "programmingLevel": "Senior",
            "pricePerHour": 199
        },
    ]
    ```

### Request: POST `api/v1/employes` - create new employee

- Request:
 
  Query parametrs

    | Parameter        | Type    | Required | Description                 |
    | ---------------- | ------- | -------- | --------------------------- |
    | firstName        | string  | Yes      | The employee's first name.  |
    | lastName         | string  | Yes      | The employee's last naem.   |
    | email            | string  | Yes      | The employee's email.       |
    | age              | integer | Yes      | The employee's age.         |
    | workExperience   | integer | Yes      | The number of years worked. |
    | programmingLevel | string  | Yes      | The programming level.      |
    | pricePerHour     | float   | Yes      | The price per hour in $.    |

- Response:
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json 
        {
          "firstName": "New",
          "lastName": "Employee",
          "email": "new@employee.com",
          "age": 1
          "workExperience": 1,
          "programmingLevel": "Junior",
          "pricePerHour": 1
        }
       
    ```


- ### Request: DELETE `api/v1/employes/{employeeID}` - delete employee by Id

- Request:
 
  Query parametrs

    | Parameter  | Type    | Required | Description      |
    | ---------- | ------- | -------- | ---------------- |
    | employeeId | integer | Yes      | The employee ID. |

- Response:
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json 
      {
        "firstName": "Elon",
        "lastName": "Musk",
        "email": "elon@x.com",
        "age": 15
        "workExperience": 1,
        "programmingLevel": "Junior",
        "pricePerHour": 10
      },
        
    ```
## Users
- ### Request: GET `api/v1/users` - get all users
- Response:
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json [
        {
            "id": 1,
            "firstName": "Test",
            "lastName": "User",
            "email": "test_user@gmail.com",
        },
        {
            "id": 2,
            "firstName": "Test1",
            "lastName": "User1",
            "email": "test1_user@gmail.com",
        }
    ]
    ```

- ### Request: GET `api/v1/projects/{userId}` - get user by id
  
  Query Parameters

  | Parameter | Type   | Required | Description  |
  | --------- | ------ | -------- | ------------ |
  | userId    | string | Yes      | The user ID. |

- Response:
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
	{	
    "firstName": "Test",
    "lastName": "User",
    "email": "test_user@gmail.com",
	}
    ```

- ### Request: POST `api/v1/projects/` - create new user
  
  Query Parameters

  | Parameter | Type   | Required | Description            |
  | --------- | ------ | -------- | ---------------------- |
  | firstName | string | Yes      | The user's first name. |
  | lastName  | string | Yes      | The user's last name.  |
  | email     | string | Yes      | The user's email.      |

- Response (returns created user):
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
	{
      "id": 3,
			"firstName": "Test",
			"lastName": "User",
			"email": "test_user@gmail.com",
	}
    ```

- Request: DELETE `api/v1/projects/{projectId}` - delete user by id
  
  Query Parameters

  | Parameter | Type    | Required | Description  |
  | --------- | ------- | -------- | ------------ |
  | userId    | integer | Yes      | The user ID. |

- Response (returns deleted project):
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json
	{
		"id": "1",
			"firstName": "Test",
			"lastName": "User",
			"email": "test_user@gmail.com",
	}
  ```
# Install 
Clone this repo with command

```bash
git clone git@github.com:ilyaKarachun/HospitalSolvd.git
```
Go to project folder
```bash
cd hospitalSolvd
```
Install dependencies

```bash
npm install
```
# Run in docker container 
For running application in Docker container you should have docker installed on your machine

Run app

```bash
docker compose up
```
Stop App

```bash
docker compose down
```
For Run App
Run command

```bash
node index.ts
```
