import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigService {
    private configLocation = "/client-config.json";
    private _location: string;

    constructor(private httpClient: HttpClient) {
    }

    getBaseApi(): Observable<string> {
        return this._location ? of(this._location) : this.httpClient.get(this.configLocation).pipe(
            map((x: any) => {
                this._location = x.baseUrl;
                return this._location;
            }));
    }
}