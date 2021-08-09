import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";

@Injectable()
export class IDBService {
    private db: IDBDatabase;

    constructor() { }

    clearConfigData(): Observable<any> {
        return new Observable(observer => {
            this.clearData(observer, 'config_data');
        });
    }

    clearGameData(): Observable<any> {
        return new Observable(observer => {
            this.clearData(observer, 'game_data');
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

    updateGameData(gameData): void {
        let data = JSON.parse(JSON.stringify(gameData));
        data['type'] = 'count';
        this.updateData('game_data', data);
    }

    private clearData(observer: Subscriber<any>, store: string) {
        this.getDb().subscribe(db => {
            db.transaction(store, 'readwrite').objectStore(store).clear();
            observer.next(null);
            observer.complete();
        });
    }

    private getDb(): Observable<IDBDatabase> {
        return new Observable(observer => {
            if (this.db) {
                observer.next(this.db);
                observer.complete();
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
            };
            request.onsuccess = () => {
                console.log('onsuccess');
                this.db = request.result;
                // return this.db;
                observer.next(this.db);
                observer.complete();
            };
        });
    }

    private getSingleData(observer: Subscriber<any>, store: string): any {
        this.getDb().subscribe(db => {
            const transaction: IDBTransaction = db.transaction(store, 'readonly');
            const objectStore: IDBObjectStore = transaction.objectStore(store);

            let data = undefined;
            objectStore.openCursor().onsuccess = (e: Event) => {
                const cursor: IDBCursorWithValue = (<any>e.target).result;
    
                if (cursor) {
                    if (cursor.value) {
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
}