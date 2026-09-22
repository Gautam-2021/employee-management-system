
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Employee } from '../../../core/services/employee';
   import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail implements OnInit {

  employee: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private employeeService: Employee
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadEmployee(id);
    }
  }

  loadEmployee(id: string): void {

    this.employeeService.getEmployeeById(id).subscribe({

      next: (response: any) => {

        this.employee = response.data;

        this.loading = false;
      },

      error: (error) => {

        console.error('Employee Details Error:', error);

        this.loading = false;
      }

    });
  }
}