import { createAction, props } from "@ngrx/store";
import { Article } from "src/components/article/article.class";

export enum NewsActions {
  GET_MAIN_PAGE_ARTICLES = '[News] get main page articles',
  // GET_MAIN_PAGE_WEBSITES = '[News] get main page websites',
  GET_ARTICLES_BY_USER = '[News] get articles by user',
  GET_ARTICLES_BY_USER_SUCCESS = '[News] get articles by user success',
  // GET_STOCK_VIEW = '[News] get stock view',
  // ADD_STOCK_TO_WATCHLIST = '[News] add stock to watch list',
  // REMOVE_STOCK_FROM_WATCHLIST = '[News] remove stock from watchlist',
  // REMOVE_WEBSITE_FROM_WATCHLIST = '[News] remove website from watchlist',

  GET_PREFERRED_WEBSITE_ARTICLES_BY_USER = '[News] get preferred website articles by user',
  GET_WEBSITES_BY_USER = '[News] get websites by user',
  ADD_WEBSITE_TO_WATCH_LIST = '[News] add website to watch list',
  REMOVE_WEBSITE_TO_WATCH_LIST = '[News] remove website to watch list',
  GET_AVAILABLE_WEBSITES = '[News] get available websites',

  GET_NEWS_BY_USER = '[Stocks] get news by user',
  GET_NEWS_BY_USER_SUCCESS = '[Stocks] get news by user success',
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
  props<{ userEmail: string }>()
);
export const getWebsitesByUser = createAction(
  NewsActions.GET_WEBSITES_BY_USER,
  props<{ userEmail: string }>()
);
export const addWebsiteToWatchList = createAction(
  NewsActions.ADD_WEBSITE_TO_WATCH_LIST,
  props<{ userEmail: string; websiteId: string }>()
);

export const removeWebsiteFromWatchList = createAction(
  NewsActions.REMOVE_WEBSITE_TO_WATCH_LIST,
  props<{ userEmail: string; websiteId: string }>()
);
export const getAvailableWebsites = createAction(
  NewsActions.GET_AVAILABLE_WEBSITES
);

export const getNewsByUser = createAction(NewsActions.GET_NEWS_BY_USER);
export const getNewsByUserSuccess = createAction(
  NewsActions.GET_NEWS_BY_USER_SUCCESS,
  props<{ news: any[] }>()
);
