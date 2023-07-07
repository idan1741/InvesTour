import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { RequestConfigService } from "src/server-requests/requests.service";
import { Router } from "@angular/router";
import * as _ from 'lodash';
import { Observable, forkJoin, merge } from "rxjs";
import { map } from "rxjs/operators";

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
  allPostsByStock$;
  combined$

  constructor(
    private store: Store, 
    private requestConfigService: RequestConfigService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stockPrice$ = this.requestConfigService.getStockPrice(history.state.symbol);
    this.allNewsByStock$ = this.requestConfigService.getArticlesByStock(history.state.symbol);
    this.allTweetsByStock$ = this.requestConfigService.getTweetsByStock(history.state.symbol);
    this.allPostsByStock$ = this.requestConfigService.getPostsByStock(history.state.symbol);
    this.togglePeriod(this.currentPeriod);

    this.combined$ = forkJoin([
      this.requestConfigService.getTweetsByStock(history.state.symbol), 
      this.requestConfigService.getPostsByStock(history.state.symbol)
    ]).pipe(
      map(([tweets, posts]) => (tweets as any[]).concat(posts).sort(
          (a, b) =>
            new Date(b.time | b.date).getTime() -
            new Date(a.time | b.date).getTime()
        )
    ));
  }

  async togglePeriod(period: string) {
    switch(period) {
      case this.StatPeriods.Day:
        this.stock = await this.requestConfigService.getStockInfoOneDay(history.state.symbol).pipe(
          map((stock: any) => ({...stock, series: stock.series.map(s => this.formatXAxisTick(s, period)).filter(s => !_.isNull(s))}))
        ).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
      case this.StatPeriods.Week:
        this.stock = await this.requestConfigService.getStockInfoOneWeek(history.state.symbol).pipe(
          map((stock: any) => ({...stock, series: stock.series.map(s => this.formatXAxisTick(s, period)).filter(s => !_.isNull(s))}))
        ).toPromise();
        console.log(this.stock)
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
      case this.StatPeriods.Month:
        this.stock = await this.requestConfigService.getStockInfoOneMonth(history.state.symbol).pipe(
          map((stock: any) => ({...stock, series: stock.series.map(s => this.formatXAxisTick(s, period)).filter(s => !_.isNull(s))}))
        ).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
      case this.StatPeriods.Year:
        this.stock = await this.requestConfigService.getStockInfoOneYear(history.state.symbol).pipe(
          map((stock: any) => ({...stock, series: stock.series.map(s => this.formatXAxisTick(s, period)).filter(s => !_.isNull(s))}))
        ).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
      case this.StatPeriods.TenYears:
        this.stock = await this.requestConfigService.getStockInfoTenYears(history.state.symbol).pipe(
          map((stock: any) => ({...stock, series: stock.series.map(s => this.formatXAxisTick(s, period)).filter(s => !_.isNull(s))}))
        ).toPromise();
        this.setMinScaleAndColor();
        this.currentPeriod = period;
        break;
    }
  }

  setMinScaleAndColor() {
    this.yScaleMin = _.min(_.map(this.stock.series, 'value'));
    this.colorScheme.domain = [this.stock.isRiseUp ? '#5AA454' : '#E44D25'];
  }

  lastFormattedLabel: string = '';

  formatXAxisTick(data, period: string): string {
    const date = new Date(data.name);
    let formattedLabel: string;

    switch (period) {
      case this.StatPeriods.Day:
        formattedLabel = date.getHours().toString() + ':00';
        break;
      case this.StatPeriods.Week:
        formattedLabel = this.getDayOfWeek(date);
        break;
      case this.StatPeriods.Month:
        formattedLabel = date.getDate().toString();
        break;
      case this.StatPeriods.Year:
        formattedLabel = this.getMonthName(date);
        break;
      case this.StatPeriods.TenYears:
        formattedLabel = date.getFullYear().toString();
        break;
      default:
        formattedLabel = '';
    }

    if (formattedLabel === this.lastFormattedLabel) {
      return null;
    }

    this.lastFormattedLabel = formattedLabel;
    return {...data, name: formattedLabel};
  }
  
  getDayOfWeek(date: Date): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }
  
  getMonthName(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()];
  }
}
