import { Component, OnInit, AfterViewInit, ViewChild, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { MdGridTile } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Option } from '../shared/classes';
import { FormDataService } from '../shared/formData.service';

@Component({
    moduleId: module.id.toString(),
    selector: "search-form",
    templateUrl: "search-form.component.html",
    styleUrls: ["search-form.component.css"]
})
export class BookingForm implements AfterViewInit, AfterContentInit {
    private bookingForm: FormGroup;
    private tripOptions: Option[];
    private tripForWorkOptions: Option[];
    private displayOptions: boolean = false;

    @ViewChild('tripOptionsContainer') tripOptionsContainer: MdGridTile;



    constructor(private cd: ChangeDetectorRef, private formDataService: FormDataService) {
        this.tripOptions = [
            { controlName: 'freeCancelation', name: 'free cancellation', selected: false },
            { controlName: 'breakFastIn', name: 'breakfast included', selected: false },
            { controlName: 'freeWiFi', name: 'free wifi', selected: false },
            { controlName: 'parking', name: 'parking', selected: false },
            { controlName: 'fishing', name: 'fishing', selected: false },
            { controlName: 'bar', name: 'bar', selected: false }
        ];
        this.tripForWorkOptions = [
            { controlName: 'tripForWork', name: 'Yes', selected: false },
            { controlName: 'tripNotForWork', name: 'No', selected: true }
        ];
        this.bookingForm = new FormGroup({
            'searchFieldStateControl': new FormControl(),
            'checkInStateControl': new FormControl(),
            'checkOutStateControl': new FormControl(),
            'tripForWork': new FormControl(false),
            'tripNotForWork': new FormControl(true)
        });
        this.tripOptions.forEach(option => {
            this.bookingForm.addControl(option.controlName, new FormControl(false));
        });

    }

    ngAfterViewInit() {
        if (this.displayOptions) {
            let tripOptionsCount = this.tripOptions.length;
            let optionsRowCount = Math.ceil(tripOptionsCount / 3);
            this.tripOptionsContainer.rowspan = optionsRowCount + 1;
        }
    }

    //workaround for ExpressionChangedAfterItHasBeenCheckedError
    ngAfterContentInit() {
        this.cd.detectChanges();
    }

    private onBookingFormSubmit(event: Event) {
        event.preventDefault();
        if (this.bookingForm.invalid)
            return false;

        let jsonData = {};
        let preparedName: string = "";
        for (var controlName in this.bookingForm.controls) {
            if (this.bookingForm.controls.hasOwnProperty(controlName)) {
                var element = this.bookingForm.controls[controlName];
                preparedName = this.prepareFieldName(controlName);
                if (controlName != "tripNotForWork") {
                    if (element.value instanceof Date)
                        jsonData[preparedName] = (element.value as Date).toLocaleDateString();
                    else
                        jsonData[preparedName] = element.value.toString();
                }
            }
        }
        this.formDataService.sendSearchRequest(jsonData)
            .subscribe(data => console.log(data));
    }
    private prepareFieldName(name: string) {
        return name.split(/(?=[A-Z])/)
            .map(part => part.toLowerCase())
            .join(' ')
            .replace('state', '')
            .replace('control', '');
    }

}