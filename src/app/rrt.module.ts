import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ComponentModule } from './components/component.module';
import { RRTComponent } from './rrt.component';
import './rrt.scss';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ComponentModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule
    ],
    declarations: [
        RRTComponent
    ],
    bootstrap: [
        RRTComponent
    ]
})
export class AppModule {}