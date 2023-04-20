import { Component, Input} from "@angular/core";
import { Stock } from "./stock.class";


@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  @Input() stock: Stock;
  public isOpen = false;

  constructor(){}

  public toggle(){
    this.isOpen=!this.isOpen;
  }
}
