import { Component, Input} from "@angular/core";
import { Article } from "./article.class";


@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
@Input() article: Article;
public isOpen = false;

constructor(){
  console.log(this.article);
}

public toggle(){
  this.isOpen=!this.isOpen;
}
}
