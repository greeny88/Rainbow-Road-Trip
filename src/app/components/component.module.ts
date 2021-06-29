import { NgModule } from '@angular/core';

import { ComponentRoutingModule } from './component-routing.module';
import { IDBService } from './idb.service';

@NgModule({
    imports: [
        ComponentRoutingModule
    ],
    exports: [
        ComponentRoutingModule
    ],
    providers: [
        IDBService
    ]
})
export class ComponentModule {}