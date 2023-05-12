import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { getMainPageArticles } from "src/server-requests/news/news.actions";
import { selectAllNewsByUser } from "src/server-requests/news/news.reducer";
import { Observable } from "rxjs";
import { RequestConfigService } from "src/server-requests/requests.service";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public news$: Observable<any>;
  public stocks$: Observable<any>;
  // stocks = [{symbol: "APPL", name: "Tesla, Inc", change: 1.17, price: 123.5, isRiseUp: true} as Stock,
  // {symbol: "SPY", name: "s&p 500", change: 0.58, price: 382.91, isRiseUp: false} as Stock]

  ngOnInit(): void {
    this.stocks$ = this.configService.getStocksList();
    this.news$ = this.configService.getMainPageArticles();
  }

  constructor(private store: Store, private configService: RequestConfigService) { }
}
