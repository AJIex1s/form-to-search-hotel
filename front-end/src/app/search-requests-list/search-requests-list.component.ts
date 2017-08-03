import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../shared/formData.service';
import { SearchRequest, Field } from '../shared/classes';
import { FormGroup, FormControl } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Component({
    moduleId: module.id.toString(),
    selector: 'search-requests-list',
    templateUrl: 'search-requests-list.component.html',
    styleUrls: ['search-requests-list.component.css']
})
export class SearchRequestsListComponent implements OnInit {
    searchRequests: SearchRequest[] = [];
    filteredSearchRequests: any;
    private dataFieldsCount: number = 0;
    private fieldNames: string[] = [];
    private searchRequestsForm: FormGroup;
    private searchFieldStateControl: FormControl;

    constructor(private formDataService: FormDataService) {
        this.searchFieldStateControl = new FormControl();
        this.searchRequestsForm = new FormGroup({
            'searchFieldControl': this.searchFieldStateControl
        });
    }
    ngOnInit() {
        this.formDataService.getSearchRequestsData()
            .startWith([])
            .subscribe(res => this.prepareInternalData(res));

    }
    filterSearchRequests(val: string): SearchRequest[] {
        console.log(val);
        if (!val) {
            this.searchRequests.forEach(req=>req.fields.forEach(f => f.highlighted = false));
            return this.searchRequests;
        }

        let preparedFilterValue = val.toLowerCase();
        let isFieldAffectedByFilter: boolean = false;
        let needToShowRequest: boolean = false;

        return this.searchRequests.filter(request => {
            needToShowRequest = false;

            request.fields.forEach(field => {
                isFieldAffectedByFilter = field.value.toString().toLowerCase().indexOf(preparedFilterValue) > -1;
                field.highlighted = isFieldAffectedByFilter;

                if (!needToShowRequest && isFieldAffectedByFilter)
                    needToShowRequest = true;
            });

            return needToShowRequest;
        });
    }
    private needToRenderCheckBox(field: Field) {
        return field.value == 'true' || field.value == 'false';
    }
    private prepareInternalData(searchRequests: SearchRequest[]) {
        this.searchRequests = searchRequests;
        if (searchRequests.length > 0) {
            this.fieldNames = searchRequests[0].fields.map(field => field.name);
            this.dataFieldsCount = searchRequests[0].fields.length;
        }
        this.filteredSearchRequests = this.searchFieldStateControl.valueChanges
            .startWith("")
            .map(name => this.filterSearchRequests(name));
            
        console.log(this.filteredSearchRequests);
    }
    private checkBoxClick(event: Event) {
        event.preventDefault();
    }
}