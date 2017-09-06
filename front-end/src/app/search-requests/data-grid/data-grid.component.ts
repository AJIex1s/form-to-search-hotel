import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/throw';

import { SearchFormData, Field } from '../../shared/classes';
import { Observable } from 'rxjs/Observable';


@Component({
    moduleId: module.id.toString(),
    selector: 'data-grid',
    templateUrl: 'data-grid.component.html',
    styleUrls: ['data-grid.component.css']
})
export class DataGridComponent implements OnInit {
    @Input('data') searchRequests: SearchFormData[];
    filteredSearchRequests: any;
    private dataFieldsCount: number = 0;
    private fieldNames: string[] = [];
    private searchRequestsForm: FormGroup;
    private searchFieldStateControl: FormControl;

    constructor() {
        this.searchFieldStateControl = new FormControl();
        this.searchRequestsForm = new FormGroup({
            'searchFieldControl': this.searchFieldStateControl
        });
    }

    ngOnInit() {
        console.log(this.searchRequests);
        if (this.searchRequests.length > 0) {
            this.fieldNames = this.searchRequests[0].fields.map(field => field.name);
            this.dataFieldsCount = this.searchRequests[0].fields.length;
        }
        this.subscribeOnFilterChanged();
    }
    private subscribeOnFilterChanged() {
        this.filteredSearchRequests = this.searchFieldStateControl.valueChanges
            .startWith("")
            .map(name => this.filterSearchRequests(name));
    }

    // filter(search in data)
    private filterSearchRequests(val: string): SearchFormData[] {
        this.searchRequests.forEach(req => req.fields.forEach(f => f.highlighted = false));

        if (!val)
            return this.searchRequests;

        let preparedFilterValue = val.toLowerCase();
        let needToShowRequest: boolean = false;

        return this.searchRequests.filter(request => {
            needToShowRequest = false;

            request.fields.forEach(field => {
                field.highlighted = field.value.toString().toLowerCase().indexOf(preparedFilterValue) > -1;

                if (!needToShowRequest && field.highlighted)
                    needToShowRequest = true;
            });

            return needToShowRequest;
        });
    }
    private needToRenderCheckBox(field: Field) {
        return field.value == 'true' || field.value == 'false';
    }

    private checkBoxClick(event: Event) {
        event.preventDefault();
    }
}