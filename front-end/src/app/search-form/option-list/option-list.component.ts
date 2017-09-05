import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Option } from '../../shared/classes';

const ListTypes = {
    checkList: 'checkList',
    radioList: 'radioList'
}

@Component({
    moduleId: module.id.toString(),
    selector: 'option-list',
    templateUrl: 'option-list.component.html',
    styleUrls: ['option-list.component.css']
})
export class OptionListComponent {
    @Input('options') options: Option[];
    @Input('listType') listType: string;
    @Input('title') title: string;
    @Input('titlePosition') titlePosition: string;
    @Input('columnCount') columnCount: number;
    @Input('parentFormGroup') parentFormGroup: FormGroup;
}