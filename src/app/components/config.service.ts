import { Injectable } from "@angular/core";

import { IDBService } from './idb.service';

@Injectable()
export class ConfigService {
    private config: Object;

    constructor(private idb: IDBService) {}

    ngOnInit() {
        // TODO: wait for return data?
        this.config = this.idb.getConfigData();

        if (this.config === undefined) {
            // default config
            this.config = {
                'red': 1,
                'orange': 3,
                'yellow': 2,
                'green': 2,
                'blue': 1,
                'purple': 3,
                'rainbowValue': 10
            }
        }
    }

    getColorSettings(): Object {
        return this.config;
    }

    setColorSettings(config: Object) {
        this.config = config;
    }

}