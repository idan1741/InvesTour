import { EnvironmentConfig } from 'src/environments/env-loader/fetch-env-provider';
import { EnvConfig } from 'src/environments/environment-config/config.interface';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class RequestConfigService {
  constructor(
    private http: HttpClient,
    @Inject(EnvironmentConfig) private envConfig: EnvConfig
  ) {}

  // TODO: erase
  private ichaiApi = 'http://localhost:8080';
  private httpApi = this.ichaiApi;
  // private httpApi = `http://${this.envConfig.serverUrl}${this.envConfig.httpPort}`;

  // stocks
  getStocksList() {
      return this.http.get(`${this.httpApi}/stocks`)
  }
  getStockListByUser(userEmail: string) {
      return this.http.get(`${this.httpApi}/stocks/${userEmail}`)
  }
  addStockToUserList(userEmail: string, stockId: number) {
      return this.http.post(`${this.httpApi}/stocks/user/add`, { userEmail, stockId })
  }
  removeStockFromUserList(userEmail: string, stockId: number) {
      return this.http.post(`${this.httpApi}/stocks/user/delete`, { userEmail, stockId })
  }
  selectAllNewsByStock(stockSymbol: string) {
      return this.http.get(`${this.httpApi}/stocks/data/${stockSymbol}`)
  }
  getStockInfoOneDay(stockSymbol: string) {
      return this.http.get(`${this.httpApi}/stocks/data/${stockSymbol}/day`)
  }
  getStockInfoOneWeek(stockSymbol: string) {
      return this.http.get(`${this.httpApi}/stocks/data/${stockSymbol}/week`)
  }
  getStockInfoOneMonth(stockSymbol: string) {
      return this.http.get(`${this.httpApi}/stocks/data/${stockSymbol}/month`)
  }
  getStockView(userId: string, stockName: string) {
    return this.http.get(
      `${this.httpApi}/articles/user/${userId}/stock/${stockName}`
    );
  }
  addStockToWatchList(userId: string, stockName: string) {
    return this.http.post(`${this.httpApi}/user/stock`, {
      User: userId,
      Stock: stockName,
    });
  }
  removeStockFromWatchList(userId: string, stockName: string) {
    return this.http.delete(
      `${this.httpApi}/user/${userId}/stock/${stockName}`
    );
  }

  // Users
  addUser(userInfo) {
    return this.http.post(`${this.httpApi}/user`, userInfo);
  }
  deleteUser(userId) {
    return this.http.delete(`${this.httpApi}/user/${userId}`);
  }
  getUserById(userId) {
    return this.http.get(`${this.httpApi}/user/${userId}`);
  }
  loginUser(email: string, password: string) {
    return this.http.post(`${this.httpApi}/user/login`, { email, password });
  }

  // News
  getMainPageArticles() {
    return this.http.get(`${this.httpApi}/news/articles`);
  }
  getArticlesByUser(userId: string) {
    return this.http.get(`${this.httpApi}/news/articles/user/${userId}`);
  }
  getPreferredWebsiteArticlesByUser(userId: string) {
    return this.http.get(
      `${this.httpApi}/news/articles/user/website/${userId}`
    );
  }
  getWebsitesByUser(userId: string) {
    return this.http.get(`${this.httpApi}/news/websites/user/${userId}`);
  }
  addWebsiteToWatchList(userId: string, websiteId: string) {
    return this.http.post(`${this.httpApi}/news/user/add`, {
      userEmail: userId,
      websiteId,
    });
  }
  removeWebsiteFromWatchList(userId: string, websiteId: string) {
    return this.http.post(`${this.httpApi}/news/user/delete`, {
      userEmail: userId,
      websiteId,
    });
  }
  getAvailableWebsites() {
    return this.http.get(`${this.httpApi}/news/websites`);
  }

  // Data
  getMainPageGraph() {
    return this.http.get(`${this.httpApi}/main/graph`);
  }
  getGraphByUserId(userId: string) {
    return this.http.get(`${this.httpApi}/graph/user/${userId}`);
  }
  getStockGraph(stockName: string) {
    return this.http.get(`${this.httpApi}/graph/stock/${stockName}`);
  }
  getStockMessages(stockName: string) {
    return this.http.get(`${this.httpApi}/messages/stock/${stockName}`);
  }
  getStockUpdates(stockName: string) {
    return this.http.get(`${this.httpApi}/updates/stock/${stockName}`);
  }
}
