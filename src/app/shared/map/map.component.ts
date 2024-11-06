import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMap,
    MapAdvancedMarker,
    MapInfoWindow
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit{
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  options!: google.maps.MapOptions;
  markerOptions!: google.maps.marker.AdvancedMarkerElementOptions;
  advancedMarkerPosition!: google.maps.LatLngLiteral;

  ngOnInit(): void {
    this.options = {
      center: {lat: 41.664135, lng: -0.902116},
      zoom: 8,
      mapId: 'myMap'
    }
    this.markerOptions = {
      gmpDraggable: false,
      gmpClickable: true,
    }
    this.advancedMarkerPosition = {
      lat: 41.664135, lng: -0.902116
    }
  }

  openInfoWindow(marker: MapMarker){
    this.infoWindow.open(marker);
  }

  
 }
