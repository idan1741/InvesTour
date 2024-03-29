import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RequestConfigService } from '../requests.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  addWebsiteToWatchList,
  getArticlesByUser,
  getArticlesByUserSuccess,
  getNewsByUser,
  getNewsByUserSuccess,
} from './news.actions';
import { selectUsersEmail } from '../users/users.reducer';
import { Article } from 'src/components/article/article.class';

@Injectable()
export class NewsEffects {
  addNewUser = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticlesByUser),
      withLatestFrom(this.store.select(selectUsersEmail)),
      switchMap(([, userEmail]) =>
        this.configService.getArticlesByUser(userEmail).pipe(
          tap((res) => console.log(res)),
          map((res) => {
            const articlesLimit = 100;
            const articles =
              (res as Article[]).length > articlesLimit
                ? (res as Article[]).slice(articlesLimit)
                : (res as Article[]);
            const articlesInOrder: Article[] = articles.sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            );

            return getArticlesByUserSuccess({ articles: articlesInOrder });
          })
        )
      )
    )
  );

  newsList = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getNewsByUser),
        withLatestFrom(this.store.select(selectUsersEmail)),
        switchMap(([, userEmail]) =>
          this.configService.getWebsitesByUser(userEmail).pipe(
            tap((res) => console.log(res)),
            tap((res) =>
              this.store.dispatch(
                getNewsByUserSuccess({ news: res as any[] })
              )
            )
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private configService: RequestConfigService,
    private store: Store,
    private router: Router
  ) {}
}
