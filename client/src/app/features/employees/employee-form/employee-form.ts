 
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Employee } from '../../../core/services/employee';
import { Department } from '../../../core/services/department';
import { Designation } from '../../../core/services/designation';

 
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
    templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm
  implements OnInit {

  departments: any[] = [];
  designations: any[] = [];

  employeeId?: string;

  
 employeeForm:any=FormGroup
  constructor(
    private fb: FormBuilder,
    private employeeService: Employee,
    private departmentService: Department,
    private designationService: Designation,
    private route: ActivatedRoute,
    private router: Router
  ) {

     this.employeeForm = this.fb.group({

    employeeId: [
      '',
      Validators.required
    ],

    firstName: [
      '',
      Validators.required
    ],

    lastName: [
      '',
      Validators.required
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phone: [
      '',
      Validators.required
    ],

    gender: [
      '',
      Validators.required
    ],

    dateOfBirth: [
      '',
      Validators.required
    ],

    address: [
      '',
      Validators.required
    ],

    department: [
      '',
      Validators.required
    ],

    designation: [
      '',
      Validators.required
    ],

    salary: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],

    joiningDate: [
      '',
      Validators.required
    ],

    employmentType: [
      'Full Time',
      Validators.required
    ],

    status: [
      'Active',
      Validators.required
    ],

    profileImage: ['']

  });
  }

  ngOnInit(): void {

    this.loadDepartments();

    this.loadDesignations();

    this.employeeId =
      this.route.snapshot.paramMap.get('id')
      || undefined;

    if (this.employeeId) {
       
      this.loadEmployee(
        this.employeeId
      );

    }

  }

  loadDepartments() {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (response:any) => {

          this.departments = response.data;

        }

      });

  }

  loadDesignations() {

    this.designationService
      .getDesignations()
      .subscribe({

        next: (response:any) => {

          this.designations = response.data;

        }

      });

  }

  loadEmployee(id: string) {

    this.employeeService
      .getEmployeeById(id)
      .subscribe({

        next: (employee:any) => {
          console.log("emp",employee)

          this.employeeForm.patchValue({

            employeeId:
              employee.data.employeeId,

            firstName:
              employee.data.firstName,

            lastName:
              employee.data.lastName,

            email:
              employee.data.email,

            phone:
              employee.data.phone,

            gender:
              employee.data.gender,

            dateOfBirth:
              employee.data.dateOfBirth?.substring(0, 10),

            address:
              employee.data.address,

            department:
              employee.data.department?._id ||
              employee.data.department,

            designation:
              employee.data.designation?._id ||
              employee.data.designation,

            salary:
              employee.data.salary,

            joiningDate:
              employee.data.joiningDate?.substring(0, 10),

            employmentType:
              employee.data.employmentType,

            status:
              employee.data.status,

            profileImage:
              employee.data.profileImage

          });

        }

      });

  }

  saveEmployee() {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;

    }

    const data =
      this.employeeForm.value;

    if (this.employeeId) {

      this.employeeService
        .updateEmployee(
          this.employeeId,
          data
        )
        .subscribe({

          next: () => {

            this.router.navigate([
              '/employees'
            ]);

          }

        });

    } else {

      this.employeeService
        .createEmployee(data)
        .subscribe({

          next: () => {

            this.router.navigate([
              '/employees'
            ]);

          }

        });

    }

  }

}