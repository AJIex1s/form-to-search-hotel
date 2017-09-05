export interface Option {
    name: string;
    selected: boolean;
    controlName?: string;
}
export class FormDto {
    public Id: string;
    public Sended: string;
    public FieldsValues: string;
}

export class Field {
    public highlighted: boolean = false;
    constructor(public name: string, public value: any) { }
}

export class SearchFormData {
    public fields: Field[] = [];
    
    constructor(public sended: string, public fieldValues: string) {
        let fieldValuesJson = JSON.parse(this.fieldValues);
        this.fields = Object.keys(fieldValuesJson)
            .map(key => new Field(key, fieldValuesJson[key]));
    }
}