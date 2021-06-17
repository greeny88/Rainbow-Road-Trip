import { Component } from '@angular/core';

import template from './game.html';

@Component({
    selector: 'game',
    template
})
export class GameComponent {
    // TODO: allow removal of car from color
    // TODO: reset all color counts
    colors: string[];
    colorValues: Object;
    count: Object;
    score: number;

    constructor() {
        // TODO: Make this configurable (because kids like teal and pink for some reason)
        this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
        this.count = {};
        // TODO: Make this configurable
        this.colorValues = {
            'red': 1,
            'orange': 3,
            'yellow': 3,
            'green': 2,
            'blue': 1,
            'purple': 3
        };
        this.score = 0;
    }

    ngOnInit() {
        for (let color of this.colors) {
            this.count[color] = 0;
        }
    }

    addColor(color: string) {
        this.count[color] += 1;
        // TODO: save counts in indexeddb for safe keeping
        this.calculateScore();
    }

    private calculateScore() {
        this.score = 0;
        for (let color in this.count) {
            this.score += (color in this.colorValues) ? this.colorValues[color] * this.count[color] : 1 * this.count[color];
        }
        this.score += Math.min(...Object.values(this.count)) * 10; // value of each rainbow is 10
    }
}