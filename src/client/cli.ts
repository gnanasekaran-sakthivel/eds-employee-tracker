import inquirer from "inquirer";
import DepartmentService from "../services/DepartmentService.js";
import EmployeeService from "../services/EmployeeService.js";
import RoleService from "../services/RoleService.js";

// define the Cli class
class Cli {
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
          ],
        },
      ])
      .then(async (answers: { CreateOrSelect: string }) => {
        switch (answers.CreateOrSelect) {
          case "View All Employees":
            EmployeeService.retrieveAllEmployees()
              .then((employees) => {
                console.table(employees);
                this.startCli();
              })
              .catch((error) => {
                console.error("Error retrieving departments:", error);
                this.startCli();
              });
            break;

          case "Add Employee":
            await this.addEmployee();
            this.startCli();
            break;

          case "Update Employee Role":
            this.updateEmployeeRole();
            this.startCli();
            break;

          case "View All Roles":
            RoleService.retrieveAllRoles()
              .then((roles) => {
                console.table(roles);
                this.startCli();
              })
              .catch((error) => {
                console.error("Error retrieving roles:", error);
                this.startCli();
              });
            break;

          case "Add Role":
            await this.addRole();
            this.startCli();
            break;

          case "View All Departments":
            DepartmentService.retrieveAllDepartments()
              .then((departments) => {
                console.table(departments);
                this.startCli();
              })
              .catch((error) => {
                console.error("Error retrieving departments:", error);
                this.startCli();
              });
            break;

          case "Add Department":
            await this.addDepartment();
            this.startCli();
            break;

          case "Quit":
            console.log("Goodbye!");
            process.exit(); // Exit the application
            break;

          default:
            console.error("Invalid option");
            this.startCli();
            break;
        }
      })
      .catch((error) => {
        console.error("Error in CLI prompt:", error);
      });
  }

  async addEmployee(): Promise<void> {
    try {
      // Fetch all roles asynchronously
      const roles = await RoleService.retrieveAllRoles();

      // Check if roles are fetched successfully
      if (!roles || roles.length === 0) {
        console.log("No roles available.");
        return;
      }

      // Prepare the role choices (name as label and id as value)
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      // Fetch all roles asynchronously
      const managers = await EmployeeService.retrieveAllEmployees();

      // Check if roles are fetched successfully
      if (!managers || managers.length === 0) {
        console.log("No managers available.");
        return;
      }

      // Prepare the role choices (name as label and id as value)
      const managerChoices = managers.map((manager) => ({
        name: `${manager?.first_name || ""} ${manager?.last_name || ""}`,
        value: manager.id,
      }));

      // Prompt user for role title, salary, and department choice
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
          validate: (input: string) => {
            if (!input.trim()) {
              return "First name cannot be empty.";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
          validate: (input: string) => {
            if (!input.trim()) {
              return "Last name cannot be empty.";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices,
          validate: (input: number) => {
            if (!input) {
              return "Please choose a role.";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "managerId",
          message: "Who is the manager?",
          choices: [{ name: "None", value: null }, ...managerChoices],
          validate: (input: number) => {
            if (input === null || input === -1) {
              return true; // Allow "None" or a specific value
            }
            if (!input) {
              return "Please choose a manager.";
            }
            return true;
          },
        },
      ]);

      // At this point, answers contains roleTitle, salary, and departmentId
      const { firstName, lastName, roleId, managerId } = answers;

      // You can now use these values, for example, to create a new role or save them
      console.log(
        `Given firstName: ${firstName}, lastName: ${lastName}, roleId: ${roleId}, managerId: ${managerId}`
      );

      const employee = await EmployeeService.addEmployee(
        firstName,
        lastName,
        roleId,
        managerId
      );
      console.log(
        `Employee ${employee.first_name} ${employee.last_name} is added to the database`
      );
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  updateEmployeeRole(): void {}

  async addRole(): Promise<void> {
    try {
      // Fetch all departments asynchronously
      const departments = await DepartmentService.retrieveAllDepartments();

      // Check if departments are fetched successfully
      if (!departments || departments.length === 0) {
        console.log("No departments available.");
        return;
      }

      // Prepare the department choices (name as label and id as value)
      const departmentChoices = departments.map((dept) => ({
        name: dept.name,
        value: dept.id,
      }));

      // Prompt user for role title, salary, and department choice
      const { roleTitle, salary, departmentId } = await inquirer.prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "What is the name of the role?",
          validate: (input: string) =>
            !input.trim() ? "Role title cannot be empty." : true,
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
          validate: (input: string) =>
            isNaN(Number(input)) ? "Enter a valid number." : true,
        },
        {
          type: "list",
          name: "departmentId",
          message: "Which department does the role belong to?",
          choices: departmentChoices,
          validate: (input: number) =>
            !input ? "Please choose a department." : true,
        },
      ]);

      const role = await RoleService.addRole(roleTitle, salary, departmentId);
      console.log(`Role ${role.title} is added tp the database`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Method to add a new department
  async addDepartment(): Promise<void> {
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "deptName",
          message: "What is the name of the department?",
          validate: (input: string) => {
            if (!input.trim()) {
              return "Department name cannot be empty.";
            }
            return true;
          },
        },
      ]);

      const department = await DepartmentService.addDepartment(
        answers.deptName
      );
      console.log(`Department ${department.name} is added to the database`);
    } catch (error) {
      console.error("Error adding department:", error);
    }
  }
}

// export the Cli class
export default Cli;
