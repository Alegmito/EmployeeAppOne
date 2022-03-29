# EmployeeAppOne
Simple code webb app with authorization
# Requirements
1. SQL EXPRESS LocalDB. Could be changed to other SQL server like database, configure connection string in application.json file.
# Features
1. CRUD for employees.
2. Authentication and authorization by JWT tokens.
3. Account management(create, delete, login)
# Client Routes:
- '/' - Home;
- '/account/login' - login page;
- '/account/register' - register page;
- '/details' - account details page;
- '/employee' - employees page;
- '/employee/add' - create employee page;
- '/employee/{id}' - edit specific employee.
