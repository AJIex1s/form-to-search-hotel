import { Component, Input, AfterContentChecked } from '@angular/core';
import { MdDatepickerInput } from '@angular/material';
import { FormControl } from '@angular/forms';
import { GetNextDayDate, GetPrevDayDate } from '../../shared/dateHelper';

@Component({
    moduleId: module.id.toString(),
    selector: 'date-range',
    templateUrl: 'date-range.component.html',
    styleUrls: ['date-range.component.css']
})
export class DateRangeComponent implements AfterContentChecked {
    @Input('checkInStateControl') checkInStateControl: FormControl;
    @Input('checkOutStateControl') checkOutStateControl: FormControl;
    private currentDate: Date;
    constructor() {
        this.currentDate = new Date();
    }
    
    ngAfterContentChecked() {
        this.checkInStateControl.valueChanges
            .subscribe(value => this.checkInDateChanged(value));

        this.checkOutStateControl.valueChanges
            .subscribe(value => this.checkOutDateChanged(value));
    }

    private checkInDateChanged(date: Date) {
        if (!date)
            return;

        let checkInDate = date;
        let checkOutDate = this.checkOutStateControl.value;

        if (checkInDate > checkOutDate || !checkOutDate)
            this.checkOutStateControl.setValue(GetNextDayDate(checkInDate));
    }
    private checkOutDateChanged(date: Date) {
        if (!date)
            return;
        
        let checkInDate =  this.checkInStateControl.value;
        let checkOutDate = date;

        if (checkInDate > checkOutDate || !checkInDate)
            this.checkInStateControl.setValue(GetPrevDayDate(checkOutDate));
    }
}