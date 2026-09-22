
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Employee } from '../../../core/services/employee';
import { Department } from '../../../core/services/department';
import { Designation } from '../../../core/services/designation';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  role = localStorage.getItem('role');

  employees: any[] = [];
  departments: any[] = [];
  designations: any[] = [];

  totalEmployees = 0;
  activeEmployees = 0;
  inactiveEmployees = 0;
  totalDepartments = 0;
  totalDesignations = 0;

  recentEmployees: any[] = [];

  departmentStats: any[] = [];

  loading = true;

  constructor(
    private employeeService: Employee,
    private departmentService: Department,
    private designationService: Designation
  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.loading = true;

    forkJoin({

      employees:
        this.employeeService.getEmployees(),

      departments:
        this.departmentService.getDepartments(),

      designations:
        this.designationService.getDesignations()

    }).subscribe({

      next: (response: any) => {

        this.employees =
          response.employees.data || [];

        this.departments =
          response.departments.data || [];

        this.designations =
          response.designations.data || [];


        // Counts

        this.totalEmployees =
          this.employees.length;

        this.activeEmployees =
          this.employees.filter(
            employee =>
              employee.status === 'Active'
          ).length;

        this.inactiveEmployees =
          this.employees.filter(
            employee =>
              employee.status !== 'Active'
          ).length;

        this.totalDepartments =
          this.departments.length;

        this.totalDesignations =
          this.designations.length;


        // Recent employees

        this.recentEmployees =
          this.employees.slice(0, 5);


        // Department statistics

        this.calculateDepartmentStats();


        this.loading = false;

      },

      error: (error) => {

        console.error(
          'Dashboard loading error:',
          error
        );

        this.loading = false;

      }

    });

  }


  calculateDepartmentStats(): void {

    this.departmentStats =
      this.departments.map(department => {

        const count =
          this.employees.filter(
            employee =>
              employee.department === department._id
          ).length;

        return {

          name: department.name,

          count: count

        };

      });

  }


  getEmployeeDepartment(
    departmentId: string
  ): string {

    const department =
      this.departments.find(
        department =>
          department._id === departmentId
      );

    return department
      ? department.name
      : 'Unknown';

  }


  getEmployeeDesignation(
    designationId: string
  ): string {

    const designation =
      this.designations.find(
        designation =>
          designation._id === designationId
      );

    return designation
      ? designation.name
      : 'Unknown';

  }

}
