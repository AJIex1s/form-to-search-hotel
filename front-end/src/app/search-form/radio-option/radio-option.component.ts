import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MdRadioChange } from '@angular/material';

@Component({
    moduleId: module.id.toString(),
    selector: 'radio-option',
    templateUrl: 'radio-option.component.html',
    styleUrls: ['radio-option.component.css']
})
export class RadioOptionComponent {
    @Input('name') name: string;
    @Input('selected') selected: boolean;
    @Input('stateControl') stateControl: FormControl;

    //hack couse of there is no md-radio-group(todo - to research ui framework)
    valueChanged(event: MdRadioChange) {
        this.stateControl.setValue(event.source.checked);
    }
}