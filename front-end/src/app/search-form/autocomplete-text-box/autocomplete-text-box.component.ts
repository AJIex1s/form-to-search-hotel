import { Component, Input, AfterContentInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormContentService } from '../../shared/form-content.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    moduleId: module.id.toString(),
    selector: 'autocomplete-text-box',
    templateUrl: 'autocomplete-text-box.component.html',
    styleUrls: ['autocomplete-text-box.component.css']
})
export class AutocompleteTextBoxComponent implements AfterContentInit {
    @Input('stateControl') stateControl: FormControl;
    @Input('items') items: string[];
    @Input('placeholder') placeholder: string;

    private filteredItems: any;

    constructor() {}

    ngAfterContentInit() {
        this.filteredItems = this.stateControl.valueChanges
            .startWith(null)
            .map(name => this.filterItems(name));
    }

    private filterItems(val: string) {
        let preparedFilterValue: string;
        if (!val)
            return this.items;

        preparedFilterValue = val.toLowerCase();
        
        return this.items
            .filter(place => place.toLowerCase().indexOf(preparedFilterValue) === 0);
    }
}