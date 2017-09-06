import { Component, OnInit, AfterViewInit, ViewChild, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MdGridTile } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Option } from '../shared/classes';
import { FormDataService } from '../shared/form-data.service';
import { FormContentService } from '../shared/form-content.service';

@Component({
    moduleId: module.id.toString(),
    selector: "search-form",
    templateUrl: "search-form.component.html",
    styleUrls: ["search-form.component.css"]
})
export class SearchFormComponent implements AfterViewInit, AfterContentInit {
    @ViewChild('tripOptionsContainer') tripOptionsContainer: MdGridTile;
    private searchFormGroup: FormGroup;

    private commonTripOptions: Option[];
    private tripForWorkOptions: Option[];
    private destinationPlaces: string[] = [];
    private displayOptions: boolean = true;

    private dataSending: boolean = false;

    constructor(private cd: ChangeDetectorRef, 
                private formDataService: FormDataService,
                private formContentService: FormContentService) {

        this.prepareFormData();
        this.prepareFormGroup();
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

    private prepareFormData() {
        this.destinationPlaces = this.formContentService.getDestinationPlaces();
        this.commonTripOptions = this.formContentService.getTripOptions();
        this.tripForWorkOptions = [
            { controlName: 'tripForWork', name: 'Yes', selected: false },
            { controlName: 'tripNotForWork', name: 'No', selected: true }
        ];
    }
    private prepareFormGroup() {
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
            alert("data didn't sended");
        }.bind(this), 1000);
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