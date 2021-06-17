import { NgModule } from '@angular/core';

import { ComponentRoutingModule } from './component-routing.module';

@NgModule({
    imports: [
        ComponentRoutingModule
    ],
    exports: [
        ComponentRoutingModule
    ]
})
export class ComponentModule {}