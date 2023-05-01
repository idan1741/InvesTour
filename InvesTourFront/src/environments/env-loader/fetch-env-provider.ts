import { InjectionToken } from "@angular/core";
import { EnvConfig } from "../environment-config/config.interface";

export const EnvironmentConfig: InjectionToken<EnvConfig> = new InjectionToken('EnvConfig')

export function fetchEnvironmentProvider() {
    return (Promise.all([
        fetchConfig().then(res=> res.json())
    ]) as Promise<EnvConfig[]>)
    .then(getProviders)
    .catch(err=> {
        console.error('error in fetching config', err);

        throw err
    })
}

function getProviders(confArray) {
    return [{
        provide: EnvironmentConfig,
        useValue: confArray[0]
    }]
}

function fetchConfig(): Promise<Response> {
    return fetch('/assets/configs/app.config.json', {
        credentials: 'include',
        cache: "no-store"
    })
}
