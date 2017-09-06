import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/throw';

import { FormDataService } from '../shared/form-data.service';
import { SearchFormData, Field } from '../shared/classes';


@Component({
    moduleId: module.id.toString(),
    selector: 'search-requests',
    templateUrl: 'search-requests.component.html',
    styleUrls: ['search-requests.component.css']
})
export class SearchRequestsComponent implements OnInit {
    searchRequests: SearchFormData[] = [];

    constructor(private formDataService: FormDataService) {}

    ngOnInit() {
        this.formDataService.getSearchRequestsData()
            .catch(err => this.onDataReceivingError(err))
            .subscribe(res => this.searchRequests = res); //check
    }

    private onDataReceivingError(err: any) {
        alert("data doesn't loaded");

        return Observable.throw(err);
    }
}