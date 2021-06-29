import { Injectable } from "@angular/core";

import { IDBService } from './idb.service';

@Injectable()
export class ConfigService {
    private colorConfig: Object;

    constructor(private idb: IDBService) {}

    ngOnInit() {
        // TODO: wait for return data?
        this.colorConfig = this.idb.getConfigData();

        if (this.colorConfig === undefined) {
            // default config
            this.colorConfig = {
                'red': 1,
                'orange': 3,
                'yellow': 2,
                'green': 2,
                'blue': 1,
                'purple': 3
            }
        }
    }

    getColorSettings() {
        return this.colorConfig;
    }

    setColorSettings(config) {
        this.colorConfig = config;
    }

}