import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { RequestConfigService } from "src/server-requests/requests.service";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { Observable } from "rxjs";

@Component({
  selector: 'stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {
  stock: any = {
    isRiseUp: null,
    change: null,
    name: "",
    series: []
  };
  stockPrice$: Observable<any>;
  colorScheme = { domain: [] };
  yScaleMin: number = 0;

  StatPeriods = {
    Day: "Day",
    Week: "Week",
    Month: "Month",
    Year: "Year",
    TenYears: "TenYears" 
  }
  currentPeriod = this.StatPeriods.Day;
  
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);

  allTweetsByStock$;
  allNewsByStock$: Observable<any>;
  allTweetsByStock;
  constructor(
    private store: Store, 
    private requestConfigService: RequestConfigService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.stockPrice = history.state.price;
    this.stockPrice$ = this.requestConfigService.getStockPrice(history.state.symbol);
    this.togglePeriod(this.StatPeriods.Day);
    this.allNewsByStock$ = this.requestConfigService.getArticlesByStock(history.state.symbol);
    this.allTweetsByStock$ = this.requestConfigService.getTweetsByStock(history.state.symbol);
  }

  async togglePeriod(period: string) {
    switch(period) {
      case this.StatPeriods.Day:
        this.stock = await this.requestConfigService.getStockInfoOneDay(history.state.symbol).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
      case this.StatPeriods.Week:
        this.stock = await this.requestConfigService.getStockInfoOneWeek(history.state.symbol).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
      case this.StatPeriods.Month:
        this.stock = await this.requestConfigService.getStockInfoOneMonth(history.state.symbol).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
      case this.StatPeriods.Year:
        this.stock = await this.requestConfigService.getStockInfoOneYear(history.state.symbol).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
      case this.StatPeriods.TenYears:
        this.stock = await this.requestConfigService.getStockInfoTenYears(history.state.symbol).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
    }
  }

  setMinScaleAndColor() {
    this.yScaleMin = _.min(_.map(this.stock.series, 'value'));
    this.colorScheme.domain = [this.stock.isRiseUp ? '#5AA454' : '#E44D25'];
  }
}
