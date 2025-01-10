//import { QueryResult } from "pg";
import { pool, connectToDb } from "./connection.js";

await connectToDb();

//seed function
const seed = () => {};

//THEN I am presented with the following options: view all departments, view all roles, view all employees,
//add a department, add a role, add an employee, and update an employee role

//get all the departments
export const retrieveDepartments = async (): Promise<any[]> => {
  console.log("Retrieving departments ...");
  const sql = `SELECT id, name FROM department;`;

  try {
    const result = await pool.query(sql); // Wait for the query to complete
    console.log("Returning the departments...");
    return result.rows; // Return the rows from the result
  } catch (err) {
    console.error("Error retrieving departments:");
    return []; // Return an empty array on error
  }
};

//get all the roles
//get all the employees
//add a department (department values)
//add a role (role values)
//add an employee (employee values)
//update an employee role (role id)

seed();
