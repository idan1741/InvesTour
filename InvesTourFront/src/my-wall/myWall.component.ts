import { NgRedux, select } from "@angular-redux/store";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "src/article/article.class";


@Component({
  selector: 'my-wall',
  templateUrl: './myWall.component.html',
  styleUrls: ['./myWall.component.css']
})
export class MyWallComponent {
  @select(state => state.app.user)
  private user$: Observable<any>;
  public user;

  @select(state => state.articles)
  private articles$: Observable<any>;
  
  public newsArticles: Array<Article>;
  public socialMediaArticles: Array<Article>;

  constructor(){
    this.user$.subscribe((user)=> this.user = user);
    this.articles$.subscribe(articles => {
      console.log(articles);
      this.newsArticles = articles.news;
      this.socialMediaArticles = articles.socialMedia;
    })
  }


}
