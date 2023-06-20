import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {
  @Input() article;
  public isOpen = false;
  panelOpenState: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.article?.pageName) {
      this.article = {
        user: this.article.pageName,
        date: this.article.time,
        content: this.article.text,
        image: './../../assets/Facebook.png',
      };
    } else {
      this.article = { ...this.article, image: './../../assets/Twitter.png' };
    }
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }
}
