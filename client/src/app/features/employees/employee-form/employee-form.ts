 
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

        next: (response) => {

          this.departments = response;

        }

      });

  }

  loadDesignations() {

    this.designationService
      .getDesignations()
      .subscribe({

        next: (response) => {

          this.designations = response;

        }

      });

  }

  loadEmployee(id: string) {

    this.employeeService
      .getEmployee(id)
      .subscribe({

        next: (employee) => {

          this.employeeForm.patchValue({

            employeeId:
              employee.employeeId,

            firstName:
              employee.firstName,

            lastName:
              employee.lastName,

            email:
              employee.email,

            phone:
              employee.phone,

            gender:
              employee.gender,

            dateOfBirth:
              employee.dateOfBirth?.substring(0, 10),

            address:
              employee.address,

            department:
              employee.department?._id ||
              employee.department,

            designation:
              employee.designation?._id ||
              employee.designation,

            salary:
              employee.salary,

            joiningDate:
              employee.joiningDate?.substring(0, 10),

            employmentType:
              employee.employmentType,

            status:
              employee.status,

            profileImage:
              employee.profileImage

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