import { Component, Input} from "@angular/core";

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  @Input() article;
  public isOpen = false;
  panelOpenState: boolean = false;

  constructor(){ }

  public toggle(){
    this.isOpen=!this.isOpen;
  }
}
