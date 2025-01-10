export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  salary: number;
  department: string;
  manager: string | null;
}
