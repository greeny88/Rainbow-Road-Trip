import 'zone.js';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './rrt.module';

// if (PRODUCTION) {
//     //enable prod mode
//     require('reflect-metadata');
// }

platformBrowserDynamic().bootstrapModule(AppModule);