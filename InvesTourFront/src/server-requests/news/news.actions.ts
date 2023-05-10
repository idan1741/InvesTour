import { createAction, props } from "@ngrx/store";
import { Article } from "src/article/article.class";

export enum NewsActions {
    GET_MAIN_PAGE_ARTICLES = '[News] get main page articles',
    GET_MAIN_PAGE_WEBSITES = '[News] get main page websites',
    GET_ARTICLES_BY_USER = '[News] get articles by user',
    GET_ARTICLES_BY_USER_SUCCESS = '[News] get articles by user success',

    // GET_WEBSITES_BY_USER = '[News] get websites by user',
    // GET_STOCK_VIEW = '[News] get stock view',
    // ADD_STOCK_TO_WATCHLIST = '[News] add stock to watch list',
    // REMOVE_STOCK_FROM_WATCHLIST = '[News] remove stock from watchlist',
    // REMOVE_WEBSITE_FROM_WATCHLIST = '[News] remove website from watchlist'
}

export const getMainPageArticles = createAction(NewsActions.GET_MAIN_PAGE_ARTICLES);

export const getMainPageWebsites = createAction(NewsActions.GET_MAIN_PAGE_WEBSITES);

export const getArticlesByUser = createAction(NewsActions.GET_ARTICLES_BY_USER);

export const getArticlesByUserSuccess = createAction(
    NewsActions.GET_ARTICLES_BY_USER_SUCCESS,
    props<{articles: Article[]}>()
);
