import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../shared/formData.service';
import { SearchFormData, Field } from '../shared/classes';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/throw';

@Component({
    moduleId: module.id.toString(),
    selector: 'search-requests',
    templateUrl: 'search-requests.component.html',
    styleUrls: ['search-requests.component.css']
})
export class SearchRequestsComponent implements OnInit {
    searchRequests: SearchFormData[] = [];
    filteredSearchRequests: any;
    private dataFieldsCount: number = 0;
    private fieldNames: string[] = [];
    private searchRequestsForm: FormGroup;
    private searchFieldStateControl: FormControl;
    private dataLoading: boolean = false;
    private readonly DATA_LOADING_HIDE_DELAY_ON_ERROR = 1000;

    constructor(private formDataService: FormDataService) {
        this.searchFieldStateControl = new FormControl();
        this.searchRequestsForm = new FormGroup({
            'searchFieldControl': this.searchFieldStateControl
        });
    }

    ngOnInit() {
        this.dataLoading = true;
        this.formDataService.getSearchRequestsData()
            .catch(err => this.onDataReceivingError(err))
            .subscribe(res => this.onDataRecieved(res))
    }
    // process received searchRequest array    
    private onDataRecieved(searchRequests: SearchFormData[]) {
        this.prepareInternalData(searchRequests);
        this.subscribeOnFilterChanged();
        this.hideLoading();
    }
    private hideLoading() {
        setTimeout(function () {
            this.dataLoading = false;
        }.bind(this), 300);
    }
    private prepareInternalData(searchRequests: SearchFormData[]) {
        this.searchRequests = searchRequests;
        if (searchRequests.length > 0) {
            this.fieldNames = searchRequests[0].fields.map(field => field.name);
            this.dataFieldsCount = searchRequests[0].fields.length;
        }
    }
    private subscribeOnFilterChanged() {
        this.filteredSearchRequests = this.searchFieldStateControl.valueChanges
            .startWith("")
            .map(name => this.filterSearchRequests(name));
    }

    private resetDataFieldsHighlighting() {

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
    private onDataReceivingError(err: any) {
        setTimeout(function () {
            this.dataLoading = false;
            alert("data doesn't loaded");
        }.bind(this), this.DATA_LOADING_HIDE_DELAY_ON_ERROR);

        return Observable.throw(err);
    }
    private checkBoxClick(event: Event) {
        event.preventDefault();
    }
}