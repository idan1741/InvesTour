import { enableProdMode, ValueProvider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { fetchEnvironmentProvider } from './environments/env-loader/fetch-env-provider';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

fetchEnvironmentProvider()
  .then((providers: ValueProvider[]) => {
    return platformBrowserDynamic(providers).bootstrapModule(AppModule)
  })
  .catch(err => console.error(err));

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
