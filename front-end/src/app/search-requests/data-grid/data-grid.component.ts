import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/throw';

import { Field, DataService, DataRow } from '../../shared/classes';


@Component({
    moduleId: module.id.toString(),
    selector: 'data-grid',
    templateUrl: 'data-grid.component.html',
    styleUrls: ['data-grid.component.css']
})
export class DataGridComponent implements OnInit {
    @Input('dataService') dataService: DataService;
    @Input('sortByColumnIndex') sortByColumnIndex: number;

    private data: DataRow[];
    private headers: string[] = [];
    private columnCount: number = 1;
    
    private filteredData: any;
    private filterForm: FormGroup;
    private filterFieldStateControl: FormControl;

    private dataLoading = false;
    private readonly HIDE_DATA_LOADING_DELAY_ON_ERROR = 1000;

    constructor() {
        this.filterFieldStateControl = new FormControl();
        this.filterForm = new FormGroup({
            'searchFieldControl': this.filterFieldStateControl
        });
    }

    ngOnInit() {
        this.dataLoading = true;
        this.dataService.getData()
            .catch(err => Observable.throw(err))
            .subscribe(data => this.onDataReceived(data));
    }

    private onDataReceived(data: DataRow[]) {
        if (data.length < 1)
            return;
        
        this.data = data;
        this.headers = data[0].fields.map(field => field.name);
        this.columnCount = data[0].fields.length;

        if(this.sortByColumnIndex < data.length)
            this.sortData()
        else
            throw "sortBy column index is more than columns count";      

        this.subscribeOnFilterChanged();
        this.hideLoading();
    }

    private sortData() {
        this.data = this.data.sort((row1, row2) => {
            if(row1.fields[this.sortByColumnIndex] > row2.fields[this.sortByColumnIndex])
                return 1;
            if(row1.fields[this.sortByColumnIndex] < row2.fields[this.sortByColumnIndex])
                return -1;
            return 0;
        });
    }

    private subscribeOnFilterChanged() {
        this.filteredData = this.filterFieldStateControl.valueChanges
            .startWith("")
            .map(name => this.getFilteredData(name));
    }

    private getFilteredData(filterValue: string): DataRow[] {
        this.data.forEach(req => req.fields.forEach(f => f.highlighted = false));

        if (!filterValue)
            return this.data;

        let preparedFilterValue = filterValue.toLowerCase();
        let needToShowDataRow: boolean = false;

        return this.data.filter(dataRow => {
            needToShowDataRow = false;
            dataRow.fields.forEach(field => {

                field.highlighted = field.value.toString().toLowerCase()
                                        .indexOf(preparedFilterValue) > -1;

                if (!needToShowDataRow && field.highlighted)
                    needToShowDataRow = true;
            });

            return needToShowDataRow;
        });
    }
    private onDataReceivingError(err: any) {
        setTimeout(function () {
            this.dataLoading = false;
            alert("data doesn't loaded");
        }.bind(this), this.HIDE_DATA_LOADING_DELAY_ON_ERROR);

        return Observable.throw(err);
    }
    private hideLoading() {
        setTimeout(function () {
            this.dataLoading = false;
        }.bind(this), 300);
    }
    private needToRenderCheckBox(field: Field) {
        return field.value == 'true' || field.value == 'false';
    }

    private checkBoxClick(event: Event) {
        event.preventDefault();
    }
}