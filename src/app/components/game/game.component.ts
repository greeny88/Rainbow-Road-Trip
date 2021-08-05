import { Component } from '@angular/core';

import { IDBService } from '../idb.service';

import template from './game.html';

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
    score: number;

    constructor(private idb: IDBService) {
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
        this.score = 0;
    }

    ngOnInit() {
        this.idb.getGameData().subscribe(data => {
            this.count = data;
            delete this.count['type'];

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

    addColor(color: string) {
        this.count[color] += 1;
        this.idb.updateGameData(this.count);
        this.calculateScore();
    }

    private calculateScore() {
        this.score = 0;
        for (let color in this.count) {
            this.score += (color in this.colorValues) ? this.colorValues[color] * this.count[color] : 1 * this.count[color];
        }
        const currentRainbowCount = Math.min(...Object.values(this.count));
        if (this.previousRainbowCount != currentRainbowCount) {
            this.displayTheRainbow();
            this.previousRainbowCount = currentRainbowCount;
        }
        this.score += currentRainbowCount * 10; // value of each rainbow is 10
    }

    private displayTheRainbow() {
        if (this.gameLoading) {
            return;
        }
        this.displayRainbow = true;
        setTimeout(() => this.displayRainbow = false, 3000);
    }

    resetScore() {
        this.idb.clearGameData();
    }

    removeColor(color: string) {
        this.count[color] -= (this.count[color] > 0) ? 1 : 0;
        this.idb.updateGameData(this.count);
        this.calculateScore();
    }
}