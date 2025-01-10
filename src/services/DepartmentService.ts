import { pool, connectToDb } from "./connection.js";
import { Department } from "../types/Department.js";

await connectToDb();

class DepartmentService {
  async retrieveAllDepartments(): Promise<Department[]> {
    const sql = `SELECT id, name FROM department;`;

    try {
      const result = await pool.query(sql);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async addDepartment(name: string): Promise<Department> {
    const query = "INSERT INTO department (name) VALUES ($1) RETURNING *";

    try {
      const result = await pool.query(query, [name]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default new DepartmentService();
