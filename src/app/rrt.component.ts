import { Component, NgZone, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

import template from './rrt.html';

@Component({
    selector: 'rainbow-road-trip',
    template
})
export class RRTComponent {
    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(private zone: NgZone, private snackBar: MatSnackBar) {}

    ngOnInit() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.getRegistration('service-worker.js').then(registration => {
                    registration.onupdatefound = (event) => {
                        this.zone.run(() => {
                            const snackRef = this.snackBar.open('New version of app available', 'Refresh');
                            snackRef.onAction().subscribe(() => location.reload());
                        });
                    }
                })
            });
        }
    }
}