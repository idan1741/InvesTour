import { Injectable } from "@angular/core";
import { dispatch } from '@angular-redux/store';
import { Article } from "src/article/article.class";

export const INIT_ARTICLES = "INIT_ARTICLES";

@Injectable()
export class AppActions {

    constructor(){}

    @dispatch()
    public static init(field: string, value: Array<Article>){
        return {
            type: INIT_ARTICLES,
            payload: {
                field,
                value
            }
        }
    }
}
