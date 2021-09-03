import { NgModule } from '@angular/core';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';

import './rules.scss';

@NgModule({
    imports: [
        RulesRoutingModule
    ],
    exports: [
        RulesRoutingModule
    ],
    declarations: [
        RulesComponent
    ]
})
export class RulesModule {}