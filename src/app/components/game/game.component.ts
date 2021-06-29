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
    score: number;

    constructor(private idb: IDBService) {
        // TODO: Make this configurable (because kids like teal and pink for some reason)
        // this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
        // this.count = {};
        // TODO: Make this configurable
        this.colorValues = {
            'red': 1,
            'orange': 3,
            'yellow': 3,
            'green': 2,
            'blue': 1,
            'purple': 3
        };
        this.colors = Object.keys(this.colorValues);
        this.score = 0;
    }

    ngOnInit() {
        this.idb.getGameData().subscribe(data => {
            this.count = data;
            console.log('count', this.count);

            if (this.count === undefined) {
                this.count = {};
                for (let color of Object.keys(this.colorValues)) {
                    this.count[color] = 0;
                }
                console.log('count', this.count);
            }
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
        this.score += Math.min(...Object.values(this.count)) * 10; // value of each rainbow is 10
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