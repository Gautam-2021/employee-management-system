import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  //  private apiUrl =  'http://localhost:3000/api/employees';
  private apiUrl = '/api/employees';
  constructor(private http: HttpClient) {}

  getEmployees(page: number = 1, limit: number = 10) {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  getEmployeeById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEmployee(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateEmployee(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
