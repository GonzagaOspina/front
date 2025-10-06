import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-reservar-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss']
})
export class ReservarPage {
  reserva = {
    start_date: '',
    end_date: '',
    metodo_pago: 'tarjeta',
    card_last4: '',
    comentarios: '',
  };

  vehicleId: string = '';
  mensaje = '';
  cargando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservasService: ReservasService
  ) {}
ngOnInit() {
  this.vehicleId = this.route.snapshot.paramMap.get('id') || ''; // ✅ FIX
}

  reservar() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.mensaje = 'Usuario no autenticado';
      return;
    }
    const payload = {
      vehicle_id: this.vehicleId,
      ...this.reserva
    };
    console.log('Payload enviado:', payload);

    this.cargando = true;
    this.reservasService.crearReserva(payload, token).subscribe({
      next: (res) => {
        this.mensaje = 'Reserva creada con éxito 🚗';
        this.cargando = false;
        console.log(res);
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: (err) => {
        this.mensaje = 'Error al crear la reserva ❌';
        this.cargando = false;
        console.error(err);
      }
    });
  }
}
