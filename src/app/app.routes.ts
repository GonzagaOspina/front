import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { VehicleSearchComponent } from './pages/vehicle-search/vehicle-search.component';
import { ReservarPage } from './pages/reserva/reservar.page';
import { LoginPage } from './pages/auth/login.page';

export const routes: Routes = [
  { path: '', component: Home },                // ahora esta es la principal ✅
  { path: 'buscar', component: VehicleSearchComponent }, // la de búsqueda
  {path: 'reservar/:vehicleId', component: ReservarPage},
  { path: 'login', component: LoginPage }

];
