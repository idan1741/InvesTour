import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() article;
  public isOpen = false;
  panelOpenState: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.article = { ...this.article, title: this.article.content.substring(0, 20) + "..." };

  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }
}
