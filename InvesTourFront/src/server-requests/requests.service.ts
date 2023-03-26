import { EnvironmentConfig } from 'src/environments/env-loader/fetch-env-provider';
import { EnvConfig } from 'src/environments/environment-config/config.interface';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class RequestConfigService {
    constructor(private http: HttpClient, @Inject(EnvironmentConfig) private envConfig: EnvConfig) {}
    
    private httpApi = `http://${this.envConfig.serverUrl}${this.envConfig.httpPort}`;

    // Users
    private addUser(userInfo) {
        return this.http.post(`${this.httpApi}/user`, userInfo)
    }
    private deleteUser(userId) {
        return this.http.delete(`${this.httpApi}/user/${userId}`)
    }
    private getUserById(userId) {
        return this.http.get(`${this.httpApi}/user/${userId}`)
    }
    private loginUser(userInfo: {email: string, password: string}) {
        return this.http.post(`${this.httpApi}/login`, userInfo)
    }

    // News
    private getMainPageArticles() {
        return this.http.get(`${this.httpApi}/news/articles`)
    }
    private getMainPageWebsites() {
        return this.http.get(`${this.httpApi}/news/websites`)
    }
    private getArticlesByUser(userId: string) {
        return this.http.get(`${this.httpApi}/news/articles/user/${userId}`)
    }
    private getWebsitesByUser(userId: string) {
        return this.http.get(`${this.httpApi}/news/websites/user/${userId}`)
    }
    private getStockView(userId: string, stockName: string) {
        return this.http.get(`${this.httpApi}/articles/user/${userId}/stock/${stockName}`)
    }
    private addStockToWatchList(userId: string, stockName: string) {
        return this.http.post(`${this.httpApi}/user/stock`, {User: userId, Stock: stockName})
    }
    private removeStockFromWatchList(userId: string, stockName: string) {
        return this.http.delete(`${this.httpApi}/user/${userId}/stock/${stockName}`)
    }
    private removeWebsiteFromWatchList(userId: string, stockName: string, websiteId: string) {
        return this.http.post(`${this.httpApi}/user/stock/website`, {User: userId, Stock: stockName, Website: websiteId})
    }
    private removeWebsite(userId: string, stockName: string, websiteId: string) {
        return this.http.delete(`${this.httpApi}/user/${userId}/stock/${stockName}/website/${websiteId}`)
    }

    // Data
    private getMainPageGraph() {
        return this.http.get(`${this.httpApi}/main/graph`)
    }
    private getGraphByUserId(userId: string) {
        return this.http.get(`${this.httpApi}/graph/user/${userId}`)
    }
    private getStockGraph(stockName: string) {
        return this.http.get(`${this.httpApi}/graph/stock/${stockName}`)
    }
    private getStockMessages(stockName: string) {
        return this.http.get(`${this.httpApi}/messages/stock/${stockName}`)
    }
    private getStockUpdates(stockName: string) {
        return this.http.get(`${this.httpApi}/updates/stock/${stockName}`)
    }
}
