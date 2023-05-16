import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { RequestConfigService } from "src/server-requests/requests.service";
import { Router } from "@angular/router";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  allNewByUserId$: Observable<any>;
  stocks$: Observable<any>;

  ngOnInit(): void {
    this.stocks$ = this.configService.getStocksList();
    // this.store.dispatch(getArticlesByUser());
    this.allNewByUserId$ = this.configService.getMainPageArticles();
    // this.store.dispatch(getMainPageArticles());
  }

  gotoStockPage(stockSymbol) {
    this.router.navigateByUrl('/stockPage', { state: { stockSymbol } })
  }

  constructor(private configService: RequestConfigService, private router: Router) {
  }
}
