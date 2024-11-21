import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { Rating } from '../../../../model/interfaces';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingsComponent implements OnInit{

  ratingsEvent = input.required<Rating[]>();
  averageRating = signal<number>(0);

  ngOnInit(): void{
    this.calculateAverageRating();
  }

  calculateAverageRating(){
    const totalRatings = this.ratingsEvent().length;
    const sumAllRatings = this.ratingsEvent().reduce((sum, rating) => 
      sum + rating .averageRating, 0 
    );

    this.averageRating.update(value => sumAllRatings/totalRatings);
  }
}
