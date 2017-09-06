import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/throw';

import { SearchFormData, Field, DataService, DataRow } from '../../shared/classes';


@Component({
    moduleId: module.id.toString(),
    selector: 'data-grid',
    templateUrl: 'data-grid.component.html',
    styleUrls: ['data-grid.component.css']
})
export class DataGridComponent implements OnInit {
    @Input('dataService') dataService: DataService;
    private data: DataRow[];
    private filteredData: any;
    private filterForm: FormGroup;
    private filterFieldStateControl: FormControl;
    private columnCount: number = 0;

    //old
    private searchRequests: SearchFormData[];
    private filteredSearchRequests: any;
    private fieldNames: string[] = [];

    constructor() {
        this.filterFieldStateControl = new FormControl();
        this.filterForm = new FormGroup({
            'searchFieldControl': this.filterFieldStateControl
        });
    }

    ngOnInit() {
        this.dataService.getData()
            .catch(err => Observable.throw(err))
            .subscribe(res => this.dataReceived(res));
    }

    private dataReceived(data: DataRow[]) {
        this.data = data;

        if (data.length > 0) {
            this.fieldNames = data[0].fields.map(field => field.name);
            this.columnCount = data[0].fields.length;
        }

        this.subscribeOnFilterChanged();
    }

    private subscribeOnFilterChanged() {
        this.filteredData = this.filterFieldStateControl.valueChanges
            .startWith("")
            .map(name => this.getFilteredData(name));
    }

    // filter(search in data)
    private getFilteredData(filterValue: string): DataRow[] {
        this.data.forEach(req => req.fields.forEach(f => f.highlighted = false));

        if (!filterValue)
            return this.data;

        let preparedFilterValue = filterValue.toLowerCase();
        let needToShowRow: boolean = false;

        return this.searchRequests.filter(request => {
            needToShowRow = false;

            request.fields.forEach(field => {
                field.highlighted = field.value.toString().toLowerCase().indexOf(preparedFilterValue) > -1;

                if (!needToShowRow && field.highlighted)
                    needToShowRow = true;
            });

            return needToShowRow;
        });
    }

    private needToRenderCheckBox(field: Field) {
        return field.value == 'true' || field.value == 'false';
    }

    private checkBoxClick(event: Event) {
        event.preventDefault();
    }
}