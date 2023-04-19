import { filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { RequestConfigService } from "../requests.service";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { getArticlesByUser, getArticlesByUserSuccess } from "./news.actions";
import { selectUserId } from "../users/users.reducer";
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
            switchMap(([, userId]) => this.configService.getMainPageArticles().pipe(
                tap((res) => console.log(res)),
                map(res => getArticlesByUserSuccess({ 
                    articles: (res as Article[]).length > 50 ? (res as Article[]).slice(50) : (res as Article[])})
                )
            ))
        )
    )

    constructor(
        private readonly actions$: Actions, 
        private configService: RequestConfigService, 
        private store: Store,
        private router: Router
    ){}
}