import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Designation  {

  // private apiUrl = 'http://localhost:3000/api/designations';
   private apiUrl = '/api/designations';

  constructor(private http: HttpClient) {}

  getDesignations() {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }

  getDesignation(id: string) {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }

  createDesignation(data: any) {

    return this.http.post(
      this.apiUrl,
      data
    );

  }

  updateDesignation(id: string, data: any) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );

  }

  deleteDesignation(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }
}