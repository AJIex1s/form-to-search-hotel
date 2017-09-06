import { Component, Input, AfterContentInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormContentService } from '../../shared/form-content.service';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    moduleId: module.id.toString(),
    selector: 'search-field',
    templateUrl: 'search-field.component.html',
    styleUrls: ['search-field.component.css']
})
export class SearchFieldComponent implements AfterContentInit, OnInit {
    @Input('stateControl') stateControl: FormControl;
    private filteredDestinationPlaces: any;
    private destinationPlaces: string[];

    constructor(private formContentService: FormContentService) {
        this.destinationPlaces = [];
    }
    ngOnInit() {
        this.destinationPlaces = this.formContentService.getDestinationPlaces();
    }
    ngAfterContentInit() {
        this.filteredDestinationPlaces = this.stateControl.valueChanges
            .startWith(null)
            .map(name => this.filterDestinationPlaces(name));
    }

    private filterDestinationPlaces(val: string) {
        let preparedFilterValue: string;
        if (!val)
            return this.destinationPlaces;

        preparedFilterValue = val.toLowerCase();
        
        return this.destinationPlaces
            .filter(place => place.toLowerCase().indexOf(preparedFilterValue) === 0);
    }
}