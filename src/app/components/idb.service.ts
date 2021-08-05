import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class IDBService {
    private db: IDBDatabase;

    constructor() { }

    clearConfigData(): Observable<any> {
        return new Observable(observer => {
            this.clearData('config_data');
        });
    }

    clearGameData(): Observable<any> {
        return new Observable(observer => {
            this.clearData('game_data');
        });
    }

    getConfigData(): Observable<Object> {
        return new Observable(observer => {
            this.getSingleData(observer, 'config_data');
        });
    }

    getGameData(): Observable<Object> {
        return new Observable(observer => {
            this.getSingleData(observer, 'game_data');
        });
    }

    // updateConfigData(configData): Observable<any> {
    //     return new Observable(observer => {
    //         this.updateData(observer, 'config_data', configData);
    //     });
    // }

    updateGameData(gameData): void {
        let data = JSON.parse(JSON.stringify(gameData));
        data['type'] = 'count';
        this.updateData('game_data', data);
    }

    // updateGameData(gameData): Observable<any> {
    //     return new Observable(observer => {
    //         this.updateData(observer, 'game_data', gameData);
    //     });
    // }

    private clearData(store: string) {
        this.getDb().subscribe(db => {
            db.transaction(store, 'readwrite').objectStore(store).clear();
        });
    }

    private getDb(): Observable<IDBDatabase> {
        return new Observable(observer => {
            if (this.db) {
                observer.next(this.db);
                // return this.db;
            }
    
            const request: IDBOpenDBRequest = window.indexedDB.open('rainbow_road_trip', 1);
    
            request.onerror = (e) => {
                console.log(e);
                throw e;
            };
            request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
                console.log('onupgrade');
                (<any>e.target).result.createObjectStore('config_data', { keyPath: 'type' });
                (<any>e.target).result.createObjectStore('game_data', { keyPath: 'type' });
                // (<any>e.target).result.createObjectStore('config_data');
                // (<any>e.target).result.createObjectStore('game_data');
            };
            request.onsuccess = () => {
                console.log('onsuccess');
                this.db = request.result;
                // return this.db;
                observer.next(this.db);
            };
        });
    }

    private getSingleData(observer, store: string): any {
        this.getDb().subscribe(db => {
            const transaction: IDBTransaction = db.transaction(store, 'readonly');
            const objectStore: IDBObjectStore = transaction.objectStore(store);

            let data = undefined;
            objectStore.openCursor().onsuccess = (e: Event) => {
                const cursor: IDBCursorWithValue = (<any>e.target).result;
    
                if (cursor) {
                    if (cursor.value) {
                        // observer.next(cursor.value);
                        data = cursor.value;
                    }
                    cursor.continue();
                }
            };
            transaction.oncomplete = () => {
                observer.next(data);
                observer.complete();
            }
        });
    }

    private updateData(store: string, data: any) {
        this.getDb().subscribe(db => {
            db.transaction(store, 'readwrite').objectStore(store).put(data);
        });
    }

    // private updateData(observer, store: string, data: any) {
    //     this.getDb().subscribe(db => {
    //         db.transaction(store, 'readwrite').objectStore(store).put(data);
    //         // TODO: check success
    //         observer.next();
    //     })
    // }

}