import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { mockStockStatsDay, mockStockStatsMonth, mockStockStatsWeek } from "./mock-data";
import { RequestConfigService } from "src/server-requests/requests.service";
import { ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {
  @Input() stockSymbol: any;
  stock: any = {
    isRiseUp: null,
    change: null,
    price: null,
    name: "",
    series: []
  }
  colorScheme = { domain: [] };
  yScaleMin: number = 0;
  
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);

  // allNewsByStock$ = this.store.select(selectAllNewsByStock());

  constructor(private store: Store, private requestConfigService: RequestConfigService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.togglePeriod(this.StatPeriods.Day)
  }

  StatPeriods = {
    Day: "Day",
    Week: "Week",
    Month: "Month"
  }

  async togglePeriod(period) {
    switch(period) {
      case this.StatPeriods.Day:
        // this.stock = mockStockStatsDay
       
        this.stock = await this.requestConfigService.getStockInfoOneDay(history.state.stockSymbol).toPromise();
        this.setMinScaleAndColor()
        break;
      case this.StatPeriods.Week:
        // this.stock = mockStockStatsWeek
       
        this.stock = await this.requestConfigService.getStockInfoOneWeek(history.state.stockSymbol).toPromise();
        this.setMinScaleAndColor()
        break;
      case this.StatPeriods.Month:
        // this.stock = mockStockStatsMonth
        
        this.stock = await this.requestConfigService.getStockInfoOneMonth(history.state.stockSymbol).toPromise();
        this.setMinScaleAndColor()
        break;
    }
    console.log(this.stock)
  }

  setMinScaleAndColor() {
    this.yScaleMin = _.min(_.map(this.stock.series, 'value'));
    this.colorScheme.domain.push(this.stock.isRiseUp ? '#5AA454' : '#E44D25');
  }
}
