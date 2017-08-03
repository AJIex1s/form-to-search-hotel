import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
}