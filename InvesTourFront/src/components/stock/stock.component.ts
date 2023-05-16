import { Component, Input} from "@angular/core";
import { Stock } from "./stock.class";
import { Router } from "@angular/router";


@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  @Input() stock: Stock;
  public isOpen = false;
  panelOpenState: boolean = false;

  constructor(private router: Router){}

  public toggle(){
    this.isOpen=!this.isOpen;
  }

  abs(val){
    return Math.abs(val);
  }

  gotoStockPage(stockSymbol) {
    this.router.navigateByUrl('/stockPage', { state: { stockSymbol } })
  }
}
