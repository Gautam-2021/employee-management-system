import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Employee  {

  private apiUrl =
    'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees() {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  getEmployee(id: string) {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }

  createEmployee(data: any) {

    return this.http.post(
      this.apiUrl,
      data
    );

  }

  updateEmployee(id: string, data: any) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );

  }

  deleteEmployee(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }
}