import { createAction, props } from '@ngrx/store';
import { Article } from 'src/article/article.class';

export enum NewsActions {
  GET_MAIN_PAGE_ARTICLES = '[News] get main page articles',
  GET_MAIN_PAGE_WEBSITES = '[News] get main page websites',
  GET_ARTICLES_BY_USER = '[News] get articles by user',
  GET_ARTICLES_BY_USER_SUCCESS = '[News] get articles by user success',
  GET_STOCK_VIEW = '[News] get stock view',
  ADD_STOCK_TO_WATCHLIST = '[News] add stock to watch list',
  REMOVE_STOCK_FROM_WATCHLIST = '[News] remove stock from watchlist',
  REMOVE_WEBSITE_FROM_WATCHLIST = '[News] remove website from watchlist',

  GET_PREFERRED_WEBSITE_ARTICLES_BY_USER = '[News] get preferred website articles by user',
  GET_WEBSITES_BY_USER = '[News] get websites by user',
  ADD_WEBSITE_TO_WATCH_LIST = '[News] add website to watch list',
  REMOVE_WEBSITE_TO_WATCH_LIST = '[News] remove website to watch list',
  GET_AVAILABLE_WEBSITES = '[News] get available websites',

  // TODO: should be in stocks reducer
  GET_STOCKS_LIST = '[News] get stocks list',
  GET_STOCKS_LIST_SUCCESS = '[News] get stocks list success',
  ADD_STOCK_TO_USER_LIST = '[News] add stock to users list',
  REMOVE_STOCK_FROM_USER_LIST = '[News] remove stock from users list',
  GET_STOCKS_BY_USER_LIST = '[News] get stocks by user list',
  GET_STOCKS_BY_USER_LIST_SUCCESS = '[News] get stocks by user list success',
}

export const getMainPageArticles = createAction(
  NewsActions.GET_MAIN_PAGE_ARTICLES
);

export const getArticlesByUser = createAction(NewsActions.GET_ARTICLES_BY_USER);

export const getArticlesByUserSuccess = createAction(
  NewsActions.GET_ARTICLES_BY_USER_SUCCESS,
  props<{ articles: Article[] }>()
);

export const getPreferredWebsiteArticlesByUser = createAction(
  NewsActions.GET_PREFERRED_WEBSITE_ARTICLES_BY_USER,
  props<{ userId: string }>()
);
export const getWebsitesByUser = createAction(
  NewsActions.GET_WEBSITES_BY_USER,
  props<{ userId: string }>()
);
export const addWebsiteToWatchList = createAction(
  NewsActions.ADD_WEBSITE_TO_WATCH_LIST,
  props<{ userId: string; websiteId: string }>()
);

export const removeWebsiteFromWatchList = createAction(
  NewsActions.REMOVE_WEBSITE_TO_WATCH_LIST,
  props<{ userId: string; websiteId: string }>()
);
export const getAvailableWebsites = createAction(
  NewsActions.GET_AVAILABLE_WEBSITES
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
