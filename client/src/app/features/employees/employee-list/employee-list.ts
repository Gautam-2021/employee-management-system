import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Employee } from '../../../core/services/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  // Employee data
  employees: any[] = [];

  // User role
  role: string | null = localStorage.getItem('role');

  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalEmployees = 0;
  totalPages = 0;

  // Loading state
  loading = false;

  // Error message
  errorMessage = '';

  constructor(private employeeService: Employee) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // ============================================
  // GET EMPLOYEES
  // ============================================

  loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';
    this.employeeService
      .getEmployees(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: any) => {
          console.log('Employee response:', response);

          this.employees = response.data;

          this.totalEmployees = response.total;

          this.totalPages = response.pages;

          this.currentPage = response.page;

          this.loading = false;
        },

        error: (error) => {
          console.error('Error loading employees:', error);

          this.errorMessage =
            error?.error?.message || 'Unable to load employees';

          this.loading = false;
        },
      });
  }

  // ============================================
  // NEXT PAGE
  // ============================================

  nextPage(): void {
    console.log(
      'current and page size',
      this.changePageSize,
      this.currentPage,
      this.pageSize,
    );
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      this.loadEmployees();
    }
  }

  // ============================================
  // PREVIOUS PAGE
  // ============================================

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;

      this.loadEmployees();
    }
  }

  // ============================================
  // GO TO SPECIFIC PAGE
  // ============================================

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;

      this.loadEmployees();
    }
  }

  // ============================================
  // CHANGE PAGE SIZE
  // ============================================

  changePageSize(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    this.pageSize = Number(selectElement.value);

    // Reset to first page
    this.currentPage = 1;

    this.loadEmployees();
  }

  // ============================================
  // DELETE EMPLOYEE
  // ============================================

  deleteEmployee(id: string): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        console.log('Employee deleted:', response);

        // Reload current page
        this.loadEmployees();
      },

      error: (error) => {
        console.error('Delete employee error:', error);

        alert(error?.error?.message || 'Unable to delete employee');
      },
    });
  }

  // ============================================
  // PAGE NUMBERS
  // ============================================

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}
