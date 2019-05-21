import { Component, OnInit } from '@angular/core';
import { Statistic } from './../../shared/interfaces/statistic';
import { StatisticService } from './../../shared/services/statistic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.sass']
})
export class StatisticPageComponent implements OnInit {

  statsList: Statistic[] = []
  sub: Subscription

  constructor(private stats: StatisticService) {
   }

  ngOnInit() {
    console.log('stats getStats');
    this.stats.getAllStats().subscribe(stats => {
      this.statsList = stats;
      console.log('stats :', stats);
    },
    error => {
      this.statsList[0] = {
        email: 'aaa@gmail.com',
        games: 50,
        age: 11,
        PPG: 111,
        RPG: 222,
        APG: 333
      } 
      console.log('error :', error.error.message);
    }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  getStats() {
   
  }

}
