import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';

import {
  Employee
} from '../../../core/services/employee';


@Component({
  selector: 'app-employee-detail',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail
  implements OnInit {

  employee: any = null;

  loading = false;

  errorMessage = '';

  employeeId = '';


  constructor(
    private route: ActivatedRoute,
    private employeeService: Employee
  ) {}


  ngOnInit(): void {

    this.employeeId =
      this.route.snapshot.paramMap
        .get('id') || '';

    this.loadEmployee();

  }


  loadEmployee(): void {

    this.loading = true;

    this.employeeService
      .getEmployeeById(this.employeeId)
      .subscribe({

        next: (response: any) => {

          this.employee =
            response.data;

          this.loading = false;

        },

        error: (error:any) => {

          console.error(error);

          this.errorMessage =
            error?.error?.message ||
            'Employee not found';

          this.loading = false;

        }

      });

  }

}