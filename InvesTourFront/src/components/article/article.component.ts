import { Component, Input, OnInit } from "@angular/core";

const ClassificationColorsMap = {
  1: "verybad",
  2: "bad",
  3: "natural",
  4: "good",
  5: "verygood"
};

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article;
  public isOpen = false;
  panelOpenState: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.article.title = this.article.title.substring(0, 80);
    this.article = { ...this.article, class: ClassificationColorsMap[Math.round(this.article.sentimentScore / 20)] }
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }
}
