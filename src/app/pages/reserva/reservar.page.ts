import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReservasService } from '../../services/reservas.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-reservar-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss']
})
export class ReservarPage implements OnInit {
  reserva = {
    start_date: '',
    end_date: '',
    metodo_pago: 'tarjeta',
    card_last4: '',
    comentarios: '',
  };

  vehicleId = '';
  vehicle: any = null;
  vehicleError = '';
  mensaje = '';
  mensajeTipo: 'success' | 'danger' | '' = '';
  cargando = false;
  isLoadingVehicle = true;
  readonly minStartDate = new Date().toISOString().split('T')[0];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservasService: ReservasService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId') || '';

    if (!this.vehicleId) {
      this.vehicleError = 'Identificador de vehículo inválido.';
      this.isLoadingVehicle = false;
      return;
    }

    this.loadVehicle();
  }

  get minEndDate(): string {
    return this.reserva.start_date || this.minStartDate;
  }

  reservar(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.mensajeTipo = 'danger';
      this.mensaje = 'Debes iniciar sesión para completar la reserva.';
      return;
    }

    const payload = {
      vehicle_id: this.vehicleId,
      ...this.reserva
    };

    this.cargando = true;
    this.mensaje = '';
    this.mensajeTipo = '';
    this.reservasService.crearReserva(payload, token).subscribe({
      next: () => {
        this.mensaje = 'Reserva creada con éxito 🚗';
        this.mensajeTipo = 'success';
        this.cargando = false;
        form.resetForm({
          start_date: '',
          end_date: '',
          metodo_pago: 'tarjeta',
          card_last4: '',
          comentarios: '',
        });
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err) => {
        this.mensaje =
          err?.error?.message ||
          err?.error?.detail ||
          'No pudimos crear la reserva. Intenta nuevamente.';
        this.mensajeTipo = 'danger';
        this.cargando = false;
      }
    });
  }

  private loadVehicle(): void {
    this.isLoadingVehicle = true;
    this.vehicleService.getVehicleById(this.vehicleId).subscribe({
      next: (response) => {
        this.vehicle =
          response?.data ?? response?.item ?? response?.vehicle ?? response;
        this.isLoadingVehicle = false;
      },
      error: (err) => {
        this.vehicleError =
          err?.error?.message ||
          err?.error?.detail ||
          'No pudimos cargar la información de este vehículo.';
        this.isLoadingVehicle = false;
      }
    });
  }
}
