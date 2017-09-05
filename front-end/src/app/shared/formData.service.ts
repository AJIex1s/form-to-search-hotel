import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { SearchFormData, FormDto, Option } from './classes';
import { GetFormattedDate } from './dateHelper';
import { destinationPlaces, tripOptions } from './data';
import { AppConfig } from '../app.config';


@Injectable()
export class FormDataService {
    private destinationPlaces: string[] = destinationPlaces;
    private searchRequests: SearchFormData[] = [];
    private apiBaseUrl = "";

    constructor(private http: Http, private appConfig: AppConfig) {
        this.apiBaseUrl = appConfig.GetDataServiceURL();
     }

    getTripOptions(): Option[] {
        return tripOptions;
    } 
    getDestinationPlaces(): string[] {
        return this.destinationPlaces;
    }

    getSearchRequestsData(): Observable<SearchFormData[]> {
        let searchRequests: SearchFormData[] = [];
        return this.http.get(this.apiBaseUrl)
            .map(res => res.json() as FormDto[])
            .map(formsData => {
                return formsData.map(formData =>
                     new SearchFormData(GetFormattedDate(formData.Sended), formData.FieldsValues));
            })
            .catch(err => this.handleError(err));
    }

    sendSearchRequest(params: any): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers });
        return this.http.post(this.apiBaseUrl, params, options)
            .catch(err => this.handleError(err));
    }

    private handleError(error: any) {
        console.error(error.message || error);
        return Observable.throw(error);
    }
}