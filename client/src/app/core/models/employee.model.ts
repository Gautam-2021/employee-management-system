export interface Employee {
  _id?: string;

  employeeId: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  gender: string;
  dateOfBirth: string;

  address: string;

  department: string;
  designation: string;

  salary: number;

  joiningDate: string;

  employmentType: string;

  status: string;

  profileImage?: string;
}