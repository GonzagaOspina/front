import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, FormsModule, RouterModule] //
})
export class Home implements OnInit {
  filtros = {
    ciudad: '',
    tipo: '',
    fecha_inicio: '',
    fecha_fin: ''
  };

  destacados: any[] = [];
  isLoadingDestacados = false;
  errorDestacados = '';

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.cargarDestacados();
  }

  buscar(): void {
    const queryParams: Record<string, string> = {};

    Object.entries(this.filtros).forEach(([key, value]) => {
      if (value) {
        queryParams[key] = value;
      }
    });

    this.router.navigate(['/buscar'], { queryParams });
  }

  private cargarDestacados(): void {
    this.isLoadingDestacados = true;
    this.vehicleService.getVehicles({ limit: 3 }).subscribe({
      next: (response) => {
        this.destacados = this.resolveVehiclesResponse(response).slice(0, 3);
        this.isLoadingDestacados = false;
      },
      error: (err) => {
        this.errorDestacados =
          err?.error?.message ||
          err?.error?.detail ||
          'No pudimos cargar los vehículos destacados.';
        this.isLoadingDestacados = false;
      }
    });
  }

  private resolveVehiclesResponse(response: any): any[] {
    if (!response) {
      return [];
    }

    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response.items)) {
      return response.items;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.results)) {
      return response.results;
    }

    return [];
  }
}
