import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { RequestConfigService } from 'src/server-requests/requests.service';
import { Router } from '@angular/router';
import {map}  from 'rxjs/operators'


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public news$: Observable<any>;
  public stocks$: Observable<any>;
  public tweets$: Observable<any>;
  public posts$: Observable<any>;

  combined$ = forkJoin([
    this.configService.getTweetsByUserId("idoozeri@gmail.com"), 
    this.configService.getPostsByUserId("idoozeri@gmail.com")
  ]).pipe(
    map(([tweets, posts]) => (tweets as any[]).concat(posts).sort(
        (a, b) =>
          new Date(b.time | b.date).getTime() -
          new Date(a.time | b.date).getTime()
      )
  ));

  ngOnInit(): void {
    this.stocks$ = this.configService.getStocksList();
    this.news$ = this.configService.getMainPageArticles();
    this.tweets$ = this.configService.getTweetsByUserId('tweets@gmai.com');
    this.posts$ = this.configService.getPostsByUserId('tweets@gmai.com');
  }

  constructor(
    private router: Router,
    private configService: RequestConfigService
  ) {}
}
