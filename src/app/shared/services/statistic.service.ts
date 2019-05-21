import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statistic } from './../interfaces/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(  private http: HttpClient) { }

  getAllStats(): Observable<Statistic[]> {
    return this.http.get<Statistic[]>('api/stats/')
  }

}
