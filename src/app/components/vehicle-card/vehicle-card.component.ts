import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export type VehicleCardData = {
  id?: string;
  make?: string;
  model?: string;
  vehicle_type?: string;
  vehicleType?: string;
  price_per_day?: number | string;
  pricePerDay?: number | string;
  city?: string;
  location?: string;
  capacity?: number | string;
  seats?: number | string;
  transmission?: string;
  fuel_type?: string;
  fuelType?: string;
  description?: string;
};

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
})
export class VehicleCardComponent {
  @Input({ required: true }) vehicle!: VehicleCardData;
  @Input() actionLabel = 'Reservar';
  @Input() actionLink: string | any[] | null = null;
  @Input() highlight = false;

  get displayLocation(): string {
    return (
      this.vehicle.city ??
      this.vehicle.location ??
      'Sin ciudad'
    );
  }

  get pricePerDay(): string {
    const price = this.vehicle.price_per_day ?? this.vehicle.pricePerDay;
    if (price === undefined || price === null) {
      return '--';
    }
    const numeric = Number(price);
    return Number.isFinite(numeric) ? numeric.toFixed(0) : String(price);
  }

  get seatCount(): string {
    const value = this.vehicle.capacity ?? this.vehicle.seats;
    return value !== undefined && value !== null ? String(value) : '?';
  }
}
