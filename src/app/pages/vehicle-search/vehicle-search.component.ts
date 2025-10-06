import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import * as maplibregl from 'maplibre-gl';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-search',
  standalone: true,
  imports: [FormsModule, NgFor, HttpClientModule, RouterModule],
  templateUrl: './vehicle-search.html',
  styleUrls: ['./vehicle-search.scss'],
})
export class VehicleSearchComponent implements AfterViewInit, OnDestroy {
  constructor(private http: HttpClient) {}

  filters = {
    ciudad: '',
    tipo: '',
    fecha_inicio: '',
    fecha_fin: '',
  };

  vehicles: any[] = [];
 map!: maplibregl.Map;
  markers: maplibregl.Marker[] = [];

  // Diccionario con coordenadas de ejemplo
  cityCoords: any = {
    Bogota: { lat: 4.711, lng: -74.0721 },
    Medellin: { lat: 6.2518, lng: -75.5636 },
    Armenia: { lat: 4.5339, lng: -75.6811 },
  };

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  initMap() {
this.map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.stadiamaps.com/styles/osm_bright.json', // ✅
  center: [-74.0721, 4.711],
  zoom: 12,
});
this.map.addControl(
  new maplibregl.AttributionControl({
    compact: true,
    customAttribution: '© MapLibre, OpenMapTiles, OpenStreetMap'
  }),
  'bottom-right'
);
  }

  buscar() {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(this.filters)) {
      if (value) {
        params.set(key, value);
      }
    }

    const url = `/api/vehicles?${params.toString()}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.vehicles = res.items || [];
        console.log('Vehículos:', this.vehicles);
        this.updateMapMarkers();
      },
      error: (err) => {
        console.error('Error al buscar vehículos:', err);
      },
    });
  }

  updateMapMarkers() {
    if (!this.map) return;

    // Limpiar capas anteriores
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = '';
      this.initMap(); // Reinicia el mapa limpio
    }

    const ciudad = this.filters.ciudad;
    const coords = this.cityCoords[ciudad];

    if (coords) {
      this.map?.setCenter(coords);
    }

    for (const vehiculo of this.vehicles) {
      const marker = new maplibregl.Marker()
        .setLngLat(coords || [-74.0721, 4.711])
        .setPopup(
          new maplibregl.Popup().setHTML(`
            <strong>${vehiculo.make} ${vehiculo.model}</strong><br>
            ${vehiculo.vehicle_type} - $${vehiculo.price_per_day}/día<br>
            ${vehiculo.location}
          `)
        )
        .addTo(this.map!);
    }
  }
}
