import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    selector: 'check-option',
    templateUrl: 'check-option.component.html',
    styleUrls: ['check-option.component.css']
})
export class CheckOptionComponent {
    @Input('name') name: string;
    @Input('selected') selected: boolean;
    @Input('stateControl') stateControl: FormControl;
}