import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Department {
  // private apiUrl = 'http://localhost:3000/api/departments';
  
  private apiUrl = '/api/departments';
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDepartment(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDepartment(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateDepartment(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteDepartment(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
