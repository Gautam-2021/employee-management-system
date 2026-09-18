 
import { Component, OnInit } from '@angular/core';
 import { Employee } from '../../../core/services/employee';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalEmployees = 0;
  activeEmployees = 0;
  inactiveEmployees = 0;

  constructor(private employeeService: Employee) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: any) => {

        const employees = response.employees ?? response.data;

        this.totalEmployees = employees.length;

        this.activeEmployees = employees.filter(
          (employee: any) => employee.status === 'Active'
        ).length;

        this.inactiveEmployees = employees.filter(
          (employee: any) => employee.status === 'Inactive'
        ).length;

      },
      error: (error) => {
        console.error('Dashboard API Error:', error);
      }
    });
  }
}