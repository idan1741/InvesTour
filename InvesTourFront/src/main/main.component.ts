import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getArticlesByUser, getMainPageArticles } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser, selectNewsState } from "src/server-requests/news/news.reducer";
import { selectUsersFirstName, selectUsersLastName } from "src/server-requests/users/users.reducer";
import { Observable } from "rxjs";
import { RequestConfigService } from "src/server-requests/requests.service";
import { Router } from "@angular/router";

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
  name;

  ngOnInit(): void {
    this.stocks$ =  this.configService.getStocksList();
    // this.store.dispatch(getArticlesByUser());
    this.allNewByUserId$ = this.configService.getMainPageArticles();
    // this.store.dispatch(getMainPageArticles());
  }

  gotoStockPage(stockSymbol) {
    this.router.navigateByUrl('/stockPage', { state: { stockSymbol } })
  }

  constructor(private store: Store,  private configService: RequestConfigService, private router: Router) {
    this.firstName$.subscribe(name => this.name = name);
  }
}
