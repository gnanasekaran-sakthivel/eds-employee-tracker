import { pool, connectToDb } from "./connection.js";
import { Role } from "../types/Role.js";

await connectToDb();

class RoleService {
  async retrieveAllRoles(): Promise<Role[]> {
    const sql = `
    Select 
        role.id, role.title, 
        dept.name As department, role.salary
    From 
        role role 
        LEFT JOIN department dept
        ON dept.id = role.department;
    `;

    try {
      const result = await pool.query(sql);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async addRole(
    title: string,
    salary: string,
    department?: number
  ): Promise<Role> {
    const query =
      "INSERT INTO role (title, salary, department) VALUES ($1, $2, $3) RETURNING *";

    try {
      const result = await pool.query(query, [title, salary, department]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default new RoleService();
