import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dashboard {

  // private apiUrl = 'http://localhost:3000/api/dashboard';

   private apiUrl = '/api/dashboard';

  constructor(
    private http: HttpClient
  ) {}

  getDashboardStats(): Observable<any> {

    return this.http.get<any>(
      this.apiUrl
    );
  }

}