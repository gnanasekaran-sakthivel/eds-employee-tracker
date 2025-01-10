# eds-employee-tracker

# Employee Tracker Application

## Description

This application manages and tracks employees, their assigned roles and their assigned departments.
Here is the screenshot of the application with all the options when running.
![initial screenshot](/assets/InitialScreen.jpg)

There are 8 actions available in the menu.

- View All Employees
- Add Employee
- Update Employee Role
- View All Roles
- Add Role
- View All Departments
- Add Department
- Quit

Each action choice is intuitive. Please refer to the Usage section for more details.

## Usage

Here we are giving screenshots of some of the operations that a user can do using the menu.
Here is the screenshot of the result of choosing "View All Departments"
![Viewing the departments](/assets/ViewDepartments.jpg)
Other action choices like "View All Roles" and "View All Employees" are similar in nature.

Here is how we can add a department. From the main menu, choose "Add Department". Here is the sequence of screenshots about this action.
![Add Department 1](/assets/AddDepartment.jpg)
![Add Department 2](/assets/AddDepartment2.jpg)

Please refer to the walkthrough video for a demonstration of using this application.
![Demo Video]({https://drive.google.com/drive/folders/18Y533-s9utSmfTtBE4j-FhhXmLOMhW5G})

## Technical Usage

This application is available in github repository. Please note that this application uses postgres database to store data. Application requires a .env file that would contain the following property values:

- DB_NAME=\<Enter your database name here\>
- DB_USER=\<Enter your database user id here\>
- DB_PASSWORD=\<Enter the users password here\>

Three are three tables in this schema:

- department
- role
- employee

There are two sql scripts file provided. These scripts are inside the db/ folder.  
Script file 'schema.sql' contains the the schema that is used. File 'seeds.sql' contains some values that can be inserted into the tables.

We can see the schema diagram as shown below:
![schema screenshot](/assets/100-sql-challenge-ERD.png)
