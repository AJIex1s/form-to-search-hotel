import { Component, OnInit, AfterViewInit, ViewChild, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { MdGridTile } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Option } from '../shared/classes';
import { FormDataService } from '../shared/formData.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
    moduleId: module.id.toString(),
    selector: "search-form",
    templateUrl: "search-form.component.html",
    styleUrls: ["search-form.component.css"]
})
export class SearchFormComponent implements AfterViewInit, AfterContentInit {
    private searchFormGroup: FormGroup;
    private commonTripOptions: Option[];
    private tripForWorkOptions: Option[];
    private displayOptions: boolean = true;
    private dataSending: boolean = false;
    @ViewChild('tripOptionsContainer') tripOptionsContainer: MdGridTile;

    //refactor - rewrite by builder
    constructor(private cd: ChangeDetectorRef, private formDataService: FormDataService) {
        this.initializeFormData();
        this.initializeFormGroup();
    }
    private initializeFormData() {
        this.commonTripOptions = this.formDataService.getTripOptions();
        this.tripForWorkOptions = [
            { controlName: 'tripForWork', name: 'Yes', selected: false },
            { controlName: 'tripNotForWork', name: 'No', selected: true }
        ];
    }
    private initializeFormGroup() {
        this.searchFormGroup = new FormGroup({
            'searchFieldStateControl': new FormControl(),
            'checkInStateControl': new FormControl(),
            'checkOutStateControl': new FormControl(),
            'tripForWork': new FormControl(false),
            'tripNotForWork': new FormControl(true)
        });

        this.commonTripOptions.forEach(option => {
            this.searchFormGroup.addControl(option.controlName, new FormControl(false));
        });
    }

    //workaround for ExpressionChangedAfterItHasBeenCheckedError
    ngAfterContentInit() {
        this.cd.detectChanges();
    }

    ngAfterViewInit() {
        if (this.displayOptions) {
            let tripOptionsCount = this.commonTripOptions.length;
            let optionsRowCount = Math.ceil(tripOptionsCount / 3);
            this.tripOptionsContainer.rowspan = optionsRowCount + 1;
        }
    }

    private searchFormSubmit(event: Event) {
        event.preventDefault();
        if (this.searchFormGroup.invalid)
            return false;

        this.dataSending = true;
        let jsonData = this.getPreparedFormDataToSend();

        this.formDataService.sendSearchRequest(jsonData)
            .catch(err => {
                this.onSubmitRequesError();
                return Observable.throw(err);
            })
            .subscribe(data => this.dataSending = false);
    }
    private onSubmitRequesError() {
        setTimeout(function () {
            this.dataSending = false;
            alert("data doesn't sended");
        }.bind(this), 500);
    }
    private getPreparedFormDataToSend(): object {
        let jsonData = {};
        let preparedName: string = "";

        for (var controlName in this.searchFormGroup.controls) {
            if (this.searchFormGroup.controls.hasOwnProperty(controlName)) {
                var element = this.searchFormGroup.controls[controlName];
                preparedName = this.prepareFieldName(controlName);
                //refactor - hack controlName != "tripNotForWork"
                if (controlName != "tripNotForWork") {
                    if (element.value instanceof Date)
                        jsonData[preparedName] = (element.value as Date).toLocaleDateString();
                    else
                        jsonData[preparedName] = element.value.toString();
                }
            }
        }
        return jsonData;
    }
    //refactor - hack for field names 
    private prepareFieldName(name: string) {
        return name.split(/(?=[A-Z])/)
            .map(part => part.toLowerCase())
            .join(' ')
            .replace('state', '')
            .replace('control', '');
    }

}