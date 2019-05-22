import { Component, OnInit } from '@angular/core';
import { Statistic } from './../../shared/interfaces/statistic';
import { StatisticService } from './../../shared/services/statistic.service';
import { Subscription, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.sass']
})
export class StatisticPageComponent implements OnInit {

  // statsList: Statistic[] = []
  statsList$: Observable<Statistic[]>
  loading: Boolean = true

  constructor(private stats: StatisticService) {
   }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
    this.statsList$ = this.stats.getAllStats()
    .pipe(
      tap(stats => {
        console.log('getStats', stats);
      })
    )
  }


}
