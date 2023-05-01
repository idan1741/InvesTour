import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getArticlesByUser } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser } from "src/server-requests/news/news.reducer";
import { RequestConfigService } from "src/server-requests/requests.service";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);
  allNewByUserId$ = this.store.select(selectAllNewsByUser);
  stocks$: Observable<any>;
  // stocks = [{symbol: "APPL", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  // {symbol: "SPY", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock]
  name;

  ngOnInit(): void {
    this.stocks$ =  this.configService.getStocksList();
    this.store.dispatch(getArticlesByUser());
  }

  constructor(private store: Store,  private configService: RequestConfigService) {
    this.firstName$.subscribe(name => this.name = name);
  }
}
