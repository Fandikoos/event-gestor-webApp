import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private url = environment.apiUrlRatings;

  getRatingsOfEvent(){
    
  }

}
