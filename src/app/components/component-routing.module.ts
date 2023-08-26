import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
    {
        path: 'game',
        loadChildren: () => import(/* webpackPrefetch: true *//* webpackChunkName: "game" */'./game/game.module').then(m => m.GameModule)
    },
    {
        path: 'rules',
        loadChildren: () => import(/* webpackPrefetch: true *//* webpackChunkName: "rules" */'./rules/rules.module').then(m => m.RulesModule)
    },
    {
        path: 'settings',
        loadChildren: () => import(/* webpackPrefetch: true *//* webpackChunkName: "settings" */'./settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        PageNotFoundComponent
    ]
})
export class ComponentRoutingModule {}
