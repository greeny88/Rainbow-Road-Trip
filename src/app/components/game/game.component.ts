import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { IDBService } from '../idb.service';

import template from './game.html';
import confirmReset from './confirm-reset.html';

@Component({
    selector: 'game',
    template
})
export class GameComponent {
    // TODO: allow removal of car from color
    colors: string[];
    colorValues: Object;
    count: Object;
    displayRainbow: boolean;
    gameLoading: boolean;
    previousRainbowCount: number;
    removeMode: boolean;
    score: number;

    constructor(private idb: IDBService, private dialog: MatDialog) {
        // TODO: Make this configurable (because kids like teal and pink for some reason)
        this.colorValues = {
            'red': 1,
            'orange': 3,
            'yellow': 3,
            'green': 2,
            'blue': 1,
            'purple': 3
        };
        this.colors = Object.keys(this.colorValues);
        this.gameLoading = true;
        this.previousRainbowCount = 0;
        this.removeMode = false;
        this.score = 0;
    }

    ngOnInit() {
        this.idb.getGameData().subscribe(data => {
            this.count = data;
            if (this.count != undefined && 'type' in this.count) {
                delete this.count['type'];
            }

            if (this.count === undefined) {
                this.count = {};
                for (let color of Object.keys(this.colorValues)) {
                    this.count[color] = 0;
                }
            }
            this.calculateScore();
            this.gameLoading = false;
        });
    }

    private calculateScore() {
        this.score = 0;
        for (let color in this.count) {
            this.score += (color in this.colorValues) ? this.colorValues[color] * this.count[color] : 1 * this.count[color];
        }
        const currentRainbowCount = Math.min(...Object.values(this.count));
        if (this.previousRainbowCount < currentRainbowCount) {
            this.displayTheRainbow();
        }
        this.previousRainbowCount = currentRainbowCount;
        this.score += currentRainbowCount * 10; // value of each rainbow is 10
    }

    private displayTheRainbow() {
        if (this.gameLoading) {
            return;
        }
        this.displayRainbow = true;
        setTimeout(() => this.displayRainbow = false, 3000);
    }

    modifyColor(color: string) {
        if (this.removeMode) {
            this.count[color] -= (this.count[color] > 0) ? 1 : 0;
        } else {
            this.count[color] += 1;
        }
        this.calculateScore();
        this.idb.updateGameData(this.count);
    }

    resetScore() {
        const dialogRef = this.dialog.open(ConfirmResetDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.idb.clearGameData().subscribe(() => {});
                this.previousRainbowCount = 0;
                this.count = {};
                for (let color of Object.keys(this.colorValues)) {
                    this.count[color] = 0;
                }
                this.calculateScore();
            }
        });
    }

    toggleRemoveMode() {
        this.removeMode = !this.removeMode;
    }
}

@Component({
    selector: 'confirm-reset',
    template: confirmReset,
})
export class ConfirmResetDialog {

    constructor(public dialogRef: MatDialogRef<ConfirmResetDialog>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}