import { pool, connectToDb } from "./connection.js";
import { Employee } from "../types/Employee.js";

await connectToDb();

class EmployeeService {
  async retrieveAllEmployees(): Promise<Employee[]> {
    const sql = `
    SELECT 
      emp.id, 
      emp.first_name, 
      emp.last_name, 
      role.title, 
      dept.name AS department, 
      role.salary, 
      (memp.first_name || ' ' || memp.last_name) AS manager
    FROM
      employee emp
    LEFT JOIN role role 
      ON role.id = emp.role_id 
    LEFT JOIN department dept 
      ON dept.id = role.department 
    LEFT JOIN employee memp
      ON memp.id = emp.manager_id;
  `;

    try {
      const result = await pool.query(sql);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async addEmployee(
    firstName: string,
    lastName: string,
    roleId: number,
    managerId?: number
  ): Promise<Employee> {
    const query =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *";

    try {
      const result = await pool.query(query, [
        firstName,
        lastName,
        roleId,
        managerId,
      ]);

      return result.rows[0];
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  }
}

export default new EmployeeService();
