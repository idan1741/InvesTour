import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getArticlesByUser } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser } from "src/server-requests/news/news.reducer";
import { RequestConfigService } from "src/server-requests/requests.service";
import { getStocksByUser } from "src/server-requests/stocks/stocks.actions";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";

@Component({
  selector: 'my-wall',
  templateUrl: './myWall.component.html',
  styleUrls: ['./myWall.component.css']
})
export class MyWallComponent implements OnInit {
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);
  allNewByUserId$ = this.store.select(selectAllNewsByUser);
  stocks$: Observable<any>;
  name;

  // stocks = [{symbol: "TSLA", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  // {symbol: "SPY", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock]

  ngOnInit(): void {
    this.stocks$ =  this.configService.getStocksList();
    this.stocks$.subscribe(stocks=> console.log(stocks));
    this.store.dispatch(getArticlesByUser());
    this.store.dispatch(getStocksByUser());
  }

  constructor(private store: Store, private http: HttpClient, private configService: RequestConfigService) {
    this.firstName$.subscribe(name => this.name = name);
  }
}
