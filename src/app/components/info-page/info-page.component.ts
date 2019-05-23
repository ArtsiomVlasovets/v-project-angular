import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistic } from 'src/app/shared/interfaces/statistic';
import { StatisticService } from 'src/app/shared/services/statistic.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.sass']
})
export class InfoPageComponent implements OnInit {

  statsList$: Observable<Statistic[]>
  loading: Boolean = true

  constructor(private stats: StatisticService) {
   }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false
    }, 700);
    this.statsList$ = this.stats.getAllStats()
    .pipe(
      tap(stats => {
        console.log('getStats', stats);
      })
    )
  }

  todosTrackFn = (index, stats) => stats.email;

}
