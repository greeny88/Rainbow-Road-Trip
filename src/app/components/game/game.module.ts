import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent, ConfirmResetDialog } from './game.component';

import './game.scss';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        GameRoutingModule
    ],
    entryComponents: [
        ConfirmResetDialog
    ],
    exports: [
        ConfirmResetDialog,
        GameRoutingModule
    ],
    declarations: [
        ConfirmResetDialog,
        GameComponent
    ]
})
export class GameModule {}