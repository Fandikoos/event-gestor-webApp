import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CarouselComponent implements OnInit{

  images: string[] = [];

  ngOnInit(){
    this.images = [
      '../../../assets/images.events/cinema.jpg',
      '../../../assets/images.events/concert.jpg',
      '../../../assets/images.events/culture.jpg',
      '../../../assets/images.events/golf.jpg',
      '../../../assets/images.events/maraton.jpg',
      '../../../assets/images.events/party.jpg',
      '../../../assets/images.events/social.jpg',
      '../../../assets/images.events/sport.jpg',
    ];
  };


}
