import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { VehicleSearchComponent } from './pages/vehicle-search/vehicle-search.component';
import { ReservarPage } from './pages/reserva/reservar.page';
import { LoginPage } from './pages/auth/login.page';
import { RegisterPage } from './pages/auth/register.page';
import { ReservationDetailPage } from './pages/reservations/reservation-detail.page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'buscar', component: VehicleSearchComponent, canActivate: [authGuard] },
  { path: 'reservar/:vehicleId', component: ReservarPage, canActivate: [authGuard] },
  { path: 'reservas/:reservaId/detalle', component: ReservationDetailPage, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
];
