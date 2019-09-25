import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ListenerService {
    private _subject = new Subject<string>();

    listener(): Subject<string> {
        return this._subject;
    }

    publish(data: string): void {
        this._subject.next(data);
    }
}