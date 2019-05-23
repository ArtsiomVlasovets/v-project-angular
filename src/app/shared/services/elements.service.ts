import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistic } from './../interfaces/statistic';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  constructor(  private http: HttpClient) { }

  getMenuLimks(): Observable<any> {
    return this.http.get<any[]>('api/elements/menu')
    .pipe(
      shareReplay()
    )
  }

}
