import { filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { RequestConfigService } from "../requests.service";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { addStockToUserList, getArticlesByUser, getArticlesByUserSuccess, getStocksList, getStocksListSuccess, removeStockFromUserList } from "./news.actions";
import { selectUserId, selectUsersEmail } from "../users/users.reducer";
import { Article } from "src/article/article.class";
import { INITIAL_NEWS_STATE } from "src/my-wall/articles-reducer";

@Injectable()
export class NewsEffects {
    addNewUser = createEffect(() =>
        this.actions$.pipe(
            ofType(getArticlesByUser),
            // TODO: deprecate when server works
            // tap(() =>  this.store.dispatch(getArticlesByUserSuccess({ articles: INITIAL_NEWS_STATE as Article[] }))),
            withLatestFrom(this.store.select(selectUserId)),
            // filter(([, userId]) => Boolean(userId)),
            // TODO: change to getArticlesByUser()
            switchMap(([, userId]) => this.configService.getArticlesByUser(userId).pipe(
                tap((res) => console.log(res)),
                map(res => {
                    const articlesLimit = 100;
                    const articles = (res as Article[]).length > articlesLimit ? (res as Article[]).slice(articlesLimit) : (res as Article[]);
                    const articlesInOrder: Article[] = articles.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

                    return getArticlesByUserSuccess({ articles: articlesInOrder })
                })
            ))
        )
    );

    // TODO: move to stocks
    getAllStocksList = createEffect(() =>
        this.actions$.pipe(
            ofType(getStocksList),
            switchMap(() => this.configService.getStocksList().pipe(
                tap(res => console.log(res)),
                map(res => getStocksListSuccess({ stocks: (res as any[])}))
            ))
        )
    )
    addStock = createEffect(() =>
        this.actions$.pipe(
            ofType(addStockToUserList),
            withLatestFrom(this.store.select(selectUsersEmail)),
            switchMap(([{stockId}, userEmail]) => this.configService.addStockToUserList(userEmail,stockId).pipe(
                tap((res) => console.log(res))
            ))
        ),
        { dispatch: false }
    )
    removeStock = createEffect(() =>
        this.actions$.pipe(
            ofType(removeStockFromUserList),
            withLatestFrom(this.store.select(selectUsersEmail)),
            switchMap(([{stockId}, userEmail]) => this.configService.removeStockFromUserList(userEmail, stockId).pipe(
                tap((res) => console.log(res))
            ))
        ),
        { dispatch: false }
    )

    constructor(
        private readonly actions$: Actions, 
        private configService: RequestConfigService, 
        private store: Store,
        private router: Router
    ){}
}