import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { RequestConfigService } from "src/server-requests/requests.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from 'lodash';
import { Observable } from "rxjs";

@Component({
  selector: 'stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {
  // @Input() stockSymbol: any;
  stock: any = {
    isRiseUp: null,
    change: null,
    name: "",
    series: []
  };
  stockPrice: number;
  colorScheme = { domain: [] };
  yScaleMin: number = 0;

  StatPeriods = {
    Day: "Day",
    Week: "Week",
    Month: "Month"
  }
  currentPeriod = this.StatPeriods.Day;
  
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);

  allNewsByStock$: Observable<any>;
  // allNewByUserId$ = this.store.select(selectAllNewsByUser);
  // userStocklList$ = this.store.select(selectUserStockList);

  constructor(
    private store: Store, 
    private requestConfigService: RequestConfigService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stockPrice = history.state.price;
    this.togglePeriod(this.StatPeriods.Day);
    this.allNewsByStock$ = this.requestConfigService.getArticlesByStock(history.state.symbol);
  }

  async togglePeriod(period: string) {
    this.currentPeriod = period;

    switch(period) {
      case this.StatPeriods.Day:
        this.stock = await this.requestConfigService.getStockInfoOneDay(history.state.symbol).toPromise();
        this.setMinScaleAndColor()
        break;
      case this.StatPeriods.Week:
        this.stock = await this.requestConfigService.getStockInfoOneWeek(history.state.symbol).toPromise();
        this.setMinScaleAndColor()
        break;
      case this.StatPeriods.Month:
        this.stock = await this.requestConfigService.getStockInfoOneMonth(history.state.symbol).toPromise();
        this.setMinScaleAndColor()
        break;
    }
  }

  setMinScaleAndColor() {
    this.yScaleMin = _.min(_.map(this.stock.series, 'value'));
    this.colorScheme.domain.push(this.stock.isRiseUp ? '#5AA454' : '#E44D25');
  }

  goBack() {
    this.router.navigateByUrl('/myWall')
  }
}
