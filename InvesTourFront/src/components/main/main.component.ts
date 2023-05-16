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
  public news$: Observable<any>;
  public stocks$: Observable<any>;

  ngOnInit(): void {
    this.stocks$ = this.configService.getStocksList();
    this.news$ = this.configService.getMainPageArticles();
  }

  constructor(private router: Router, private configService: RequestConfigService) { }
}
