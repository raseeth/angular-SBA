import { Component, OnDestroy } from '@angular/core';
import { ListItemViewModel } from './list-item.vm';
import { Subject } from 'rxjs';

@Component({
    "templateUrl": "./list-modal.component.html"
})
export class ListModalComponent implements OnDestroy {
    
    items: ListItemViewModel[];
    subject: Subject<any>;
    searchTerm: string;

    private initialItems: ListItemViewModel[];
    
    constructor() {
        this.subject = new Subject();
    }
    
    onSelection(item: ListItemViewModel): void {
        this.subject.next(item);        
    }

    ngOnDestroy(): void {
        this.subject.complete();
    }

    onSearchTermChange(term: string): void {

        if (!this.initialItems) {
            this.initialItems = this.items;
        }

        this.items = !term ? this.initialItems : 
            this.initialItems.filter((x: ListItemViewModel) => 
                x.description.toLowerCase().indexOf(term.toLowerCase()) > -1
            ) 
    }
}