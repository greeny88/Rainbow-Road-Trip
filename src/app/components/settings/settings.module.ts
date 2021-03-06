import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [
        SettingsRoutingModule
    ],
    exports: [
        SettingsRoutingModule
    ],
    declarations: [
        SettingsComponent
    ]
})
export class SettingsModule {}