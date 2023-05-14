import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { mockStockStatsDay, mockStockStatsMonth, mockStockStatsWeek } from "./mock-data";
import { RequestConfigService } from "src/server-requests/requests.service";

@Component({
  selector: 'stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {
  @Input() stock: any;
  
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);

  // allNewsByStock$ = this.store.select(selectAllNewsByStock());

  colorScheme = { domain: [] };

  constructor(private store: Store, private requestConfigService: RequestConfigService) {}

  ngOnInit(): void {
    this.stock = mockStockStatsDay;
    this.colorScheme.domain.push(this.stock.isRiseUp ? '#5AA454' : '#E44D25');
  }

  StatPeriods = {
    Day: "Day",
    Week: "Week",
    Month: "Month"
  }

  async togglePeriod(period) {
    switch(period) {
      case this.StatPeriods.Day:
        this.stock = mockStockStatsDay
        // this.stock = await this.requestConfigService.getStockInfoOneDay(this.stock.symbol).toPromise();
        console.log(this.stock)
        break;
      case this.StatPeriods.Week:
        this.stock = mockStockStatsWeek
        // this.stock = await this.requestConfigService.getStockInfoOneWeek(this.stock.symbol).toPromise();
        console.log(this.stock)
        break;
      case this.StatPeriods.Month:
        this.stock = mockStockStatsMonth
        // this.stock = await this.requestConfigService.getStockInfoOneMonth(this.stock.symbol).toPromise();
        console.log(this.stock)
        break;
    }
  }
}
