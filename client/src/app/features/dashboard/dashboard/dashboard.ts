import {
  Component,
  OnInit
} from '@angular/core';

import { Dashboard as DashboardService }
  from '../../../core/services/dashboard';

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

  departmentStats: any[] = [];

  designationStats: any[] = [];

  loading = false;

  errorMessage = '';


  constructor(
    private dashboardService: DashboardService
  ) {}


  ngOnInit(): void {

    this.loadDashboard();

  }


  loadDashboard(): void {

    this.loading = true;

    this.dashboardService
      .getDashboardStats()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Dashboard:',
            response
          );

          const data =
            response.data;

          this.totalEmployees =
            data.totalEmployees;

          this.activeEmployees =
            data.activeEmployees;

          this.inactiveEmployees =
            data.inactiveEmployees;

          this.departmentStats =
            data.departmentStats;

          this.designationStats =
            data.designationStats;

          this.loading = false;

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            error?.error?.message ||
            'Unable to load dashboard';

          this.loading = false;

        }

      });

  }

}