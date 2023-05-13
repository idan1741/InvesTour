import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { Stock } from "src/stock/stock.class";
import { mockStockStatsDay, mockStockStatsMonth, mockStockStatsWeek } from "./mock-data";

@Component({
  selector: 'stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {
  @Input() stock: any;
  
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);

  // allNewsByStock$ = this.store.select(selectAllNewsByStock);

  colorScheme = { domain: [] };

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.stock = mockStockStatsDay;
    this.colorScheme.domain.push(this.stock.isRiseUp ? '#5AA454' : '#E44D25');
  }

  StatPeriods = {
    Day: "Day",
    Week: "Week",
    Month: "Month"
  }

  togglePeriod(period) {
    switch(period) {
      case this.StatPeriods.Day:
        this.stock = mockStockStatsDay;
        break;
      case this.StatPeriods.Week:
        this.stock = mockStockStatsWeek;
        break;
      case this.StatPeriods.Month:
        this.stock = mockStockStatsMonth;
        break;
    }
  }
}
