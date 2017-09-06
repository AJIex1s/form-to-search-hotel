import { Observable } from 'rxjs/Observable';

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

export interface DataRow {
    fields: Field[];
}
export class SearchFormData implements DataRow {
    public fields: Field[] = [];
    
    constructor(private sended: string, public fieldsJsonString: string) {
        let fieldsJson = JSON.parse(this.fieldsJsonString);
        this.fields = Object.keys(fieldsJson)
            .map(key => new Field(key, fieldsJson[key]));
        this.fields.unshift(new Field("Sended Date", sended));
    }
}

export interface DataService {
    getData(): Observable<DataRow[]>;
    sendData(jsonData: any): Observable<any>;
}
