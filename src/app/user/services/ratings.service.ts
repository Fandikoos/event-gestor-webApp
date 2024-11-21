import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Rating } from '../model/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private url = environment.apiUrlRatings;
  private http = inject(HttpClient);

  postRating(rating: Rating){
    return this.http.post(environment.apiUrlRatings, rating);
  }

}
