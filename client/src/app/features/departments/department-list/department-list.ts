  
 

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Department } from '../../../core/services/department';
import { CommonModule } from '@angular/common';

 
@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
})
export class DepartmentList
  implements OnInit {

  departments: any[] = [];
role = localStorage.getItem('role');
  constructor(
    private departmentService: Department
  ) {}

  ngOnInit(): void {

    this.loadDepartments();

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

  deleteDepartment(id: string) {

    if (!confirm(
      'Delete this department?'
    )) {
      return;
    }

    this.departmentService
      .deleteDepartment(id)
      .subscribe({

        next: () => {

          this.loadDepartments();

        }

      });

  }

}