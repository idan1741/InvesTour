import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getArticlesByUser, getMainPageArticles } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser, selectNewsState } from "src/server-requests/news/news.reducer";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { Observable } from "rxjs";
import { RequestConfigService } from "src/server-requests/requests.service";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  firstName$ = this.store.select(selectUsersFirstName);
  lastName$ = this.store.select(selectUsersLastName);
  allNewByUserId$: Observable<any>;
  stocks$: Observable<any>;
  // stocks = [{symbol: "APPL", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  // {symbol: "SPY", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock]
  name;

  ngOnInit(): void {
    this.stocks$ =  this.configService.getStocksList();
    // this.store.dispatch(getArticlesByUser());
    this.allNewByUserId$ = this.configService.getMainPageArticles();
    // this.store.dispatch(getMainPageArticles());
  }

  constructor(private store: Store,  private configService: RequestConfigService) {
    this.firstName$.subscribe(name => this.name = name);
  }
}
