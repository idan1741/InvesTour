export class Stock {
    public symbol: string;
    public name: string;
    public change: number;
    public price: number;
    public isRiseUp: boolean;
    public isInUserFav:boolean = false;

    constructor(){}
}