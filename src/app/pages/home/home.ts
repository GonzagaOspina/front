import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, FormsModule,RouterModule] //
})
export class Home {
  filtros = {
    ciudad: '',
    tipo: '',
    fechaInicio: ''
  };

  vehiculos: any[] = [];

  buscar() {
    console.log('Buscando con:', this.filtros);
    // Aquí iría tu lógica para consultar la API
  }
}
