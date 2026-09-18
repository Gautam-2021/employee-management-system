
import { Component, OnInit } from '@angular/core';

import {
  RouterLink
} from '@angular/router';
import { Employee } from '../../../core/services/employee';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList
  implements OnInit {

  employees: any[] = [];

  constructor(
    private employeeService: Employee
  ) {}

  ngOnInit(): void {

    this.loadEmployees();

  }

  loadEmployees() {

    this.employeeService
      .getEmployees()
      .subscribe({

        next: (response:any) => {
          console.log("response for emp",response)
          this.employees = response.data;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  deleteEmployee(id: string) {

    if (!confirm(
      'Are you sure you want to delete this employee?'
    )) {

      return;

    }

    this.employeeService
      .deleteEmployee(id)
      .subscribe({

        next: () => {

          this.loadEmployees();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}