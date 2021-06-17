import { Component } from '@angular/core';

import template from './game.html';

@Component({
    selector: 'game',
    template
})
export class GameComponent {
    // TODO: keep track of different car colors
    // TODO: calculate score
    // TODO: allow removal of car from color
    // TODO: reset color counts
    colors: string[];
    colorValues: Object;
    count: Object;
    score: number;

    constructor() {
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
        this.calculateScore();
    }

    private calculateScore() {
        // let rainbows = 99;
        this.score = 0;
        for (let color in this.count) {
            this.score += (color in this.colorValues) ? this.colorValues[color] * this.count[color] : 1 * this.count[color];
            // rainbows = (this.count[color] < rainbows) ? this.count[color] : rainbows;
        }
        // Math.min(...Object.values(this.count));
        this.score += Math.min(...Object.values(this.count)) * 10; // value of each rainbow is 10
    }
}