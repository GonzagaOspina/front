import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly baseUrl = '/api/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles(filters?: Record<string, unknown>): Observable<any> {
    const params = this.buildParams(filters);
    return this.http.get(this.baseUrl, { params });
  }

  getVehicleById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  private buildParams(filters?: Record<string, unknown>): HttpParams {
    let params = new HttpParams();

    if (!filters) {
      return params;
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      const normalizedValue =
        typeof value === 'string' ? value.trim() : value.toString();

      if (normalizedValue !== '') {
        params = params.set(this.normalizeKey(key), normalizedValue);
      }
    });

    return params;
  }

  private normalizeKey(key: string): string {
    return key
      .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
      .toLowerCase();
  }
}
