import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

import './game.scss';

@NgModule({
    imports: [
        CommonModule,
        GameRoutingModule
    ],
    exports: [
        GameRoutingModule
    ],
    declarations: [
        GameComponent
    ]
})
export class GameModule {}