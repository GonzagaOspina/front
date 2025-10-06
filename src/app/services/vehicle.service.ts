import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = 'http://127.0.0.1:5000/api/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles(filters?: any): Observable<any> {
    let params = new HttpParams();

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params = params.set(key, filters[key]);
      });
    }

    return this.http.get(this.baseUrl, { params });
  }

  getVehicleById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
