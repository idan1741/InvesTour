import { Component, Input} from "@angular/core";

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  @Input() article;
  public isOpen = false;
  panelOpenState: boolean = false;

  constructor(){
    console.log("checkkk", this.article)
  }

  public toggle(){
    this.isOpen=!this.isOpen;
  }
}
