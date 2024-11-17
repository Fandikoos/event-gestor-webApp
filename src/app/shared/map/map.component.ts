import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Event } from '../../user/model/interfaces';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMap,
    MapAdvancedMarker,
    MapInfoWindow,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit{
  infoWindowRef = viewChild.required(MapInfoWindow);

  options!: google.maps.MapOptions;
  markerOptions!: google.maps.marker.AdvancedMarkerElementOptions;
  
  center = signal<google.maps.LatLngLiteral>({lat:0, lng: 0});
  zoom = signal<number>(0);

  events = input<Event[]>();
  singleEvent = input<Event>();

  ngOnInit(): void {
    if(this.singleEvent()){
      this.center.set({
        lat: this.singleEvent()?.lat || 0,
        lng: this.singleEvent()?.lng || 0,
      }),
      this.zoom.set(17);
    } else {
      this.center.set({
        lat: 40.415347,
        lng: -3.707371,
      })
      this.zoom.set(6);
    }
    
    this.options = {
      center: this.center(),
      zoom: this.zoom(),
      mapId: '7ce303fcc384310c'
    } 
    this.markerOptions = {
      gmpDraggable: false,
      gmpClickable: true,
    }

  }

  openInfoWindow(location: Event, marker: MapAdvancedMarker){
    const content = `
      <div class="card shadow-lg" style="width: auto; max-width: 270px; max-height: 200px; border-radius: 16px; overflow-y: auto; transition: transform 0.3s ease;">
        <div class="card-header text-white text-center" style="background: linear-gradient(135deg, #ff512f, #f09819); border-radius: 16px 16px 0 0;">
          <h5 class="mb-0">${location.name}</h5>
        </div>
        <div class="card-body text-center">
          <p class="card-text mb-2 "><i class="fa-solid fa-calendar-days me-2"></i><strong>${location.date}</strong></p>
          <p class="card-text mb-3"><i class="fa-solid fa-map-pin me-2"></i><strong>${location.address}</strong></p>
          <button class="btn btn-primary w-100" style="background-color: #ff512f; border-color: #ff512f; border-radius: 30px; transition: background-color 0.3s ease;"
            onmouseover="this.style.backgroundColor='#e04c26'"
            onmouseout="this.style.backgroundColor='#ff512f'"
            onclick="window.location.href='/event-details/${location.id}'">
            Ver detalles
          </button>
        </div>
      </div>
    `;
  
    this.infoWindowRef().open(marker, false, content);
  }



  
 }
