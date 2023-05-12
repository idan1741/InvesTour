import { createAction, props } from "@ngrx/store";
import { Article } from "src/components/article/article.class";

export enum NewsActions {
    GET_MAIN_PAGE_ARTICLES = '[News] get main page articles',
    GET_MAIN_PAGE_WEBSITES = '[News] get main page websites',
    GET_ARTICLES_BY_USER = '[News] get articles by user',
    GET_ARTICLES_BY_USER_SUCCESS = '[News] get articles by user success',
    GET_WEBSITES_BY_USER = '[News] get websites by user',
    GET_STOCK_VIEW = '[News] get stock view',
    ADD_STOCK_TO_WATCHLIST = '[News] add stock to watch list',
    REMOVE_STOCK_FROM_WATCHLIST = '[News] remove stock from watchlist',
    REMOVE_WEBSITE_FROM_WATCHLIST = '[News] remove website from watchlist',

    // TODO: should be in stocks reducer
    GET_STOCKS_LIST = '[News] get stocks list',
    GET_STOCKS_LIST_SUCCESS = '[News] get stocks list success',
    ADD_STOCK_TO_USER_LIST = '[News] add stock to users list',
    REMOVE_STOCK_FROM_USER_LIST = '[News] remove stock from users list',
    GET_STOCKS_BY_USER_LIST = '[News] get stocks by user list',
    GET_STOCKS_BY_USER_LIST_SUCCESS = '[News] get stocks by user list success',
}

export const getMainPageArticles = createAction(NewsActions.GET_MAIN_PAGE_ARTICLES);

export const getMainPageWebsites = createAction(NewsActions.GET_MAIN_PAGE_WEBSITES);

export const getArticlesByUser = createAction(NewsActions.GET_ARTICLES_BY_USER);

export const getArticlesByUserSuccess = createAction(
    NewsActions.GET_ARTICLES_BY_USER_SUCCESS,
    props<{articles: Article[]}>()
);


// TODO: move to stocks
// export const getStocksList = createAction(NewsActions.GET_STOCKS_LIST)
// export const getStocksListSuccess = createAction(
//     NewsActions.GET_STOCKS_LIST_SUCCESS,
//     props<{ stocks: any[]}>()
// )
// export const addStockToUserList = createAction(
//     NewsActions.ADD_STOCK_TO_USER_LIST,
//     props<{ stockId: string }>()
// )
// export const removeStockFromUserList = createAction(
//     NewsActions.REMOVE_STOCK_FROM_USER_LIST,
//     props<{ stockId: string }>()
// )
// export const getStocksByUserList = createAction(NewsActions.GET_STOCKS_BY_USER_LIST)
// export const getStocksByUserListSuccess = createAction(
//     NewsActions.GET_STOCKS_BY_USER_LIST_SUCCESS,
//     props<{ stocks: any[]}>()
// )
