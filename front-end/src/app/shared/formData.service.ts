import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchFormData, FormData, Option } from './classes';
import { GetFormattedDate } from './dateHelper';
import { ServiceUrl } from '../app.config';

import { destinationPlaces, tripOptions } from './data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FormDataService {
    private destinationPlaces: string[] = destinationPlaces;
    private searchRequests: SearchFormData[] = [];
    private serviceUrl = ServiceUrl;

    constructor(private http: Http) { }
    getTripOptions(): Option[] {
        return tripOptions;
    } 
    getDestinationPlaces(): string[] {
        return this.destinationPlaces;
    }

    getSearchRequestsData(): Observable<SearchFormData[]> {
        let searchRequests: SearchFormData[] = [];
        return this.http.get(this.serviceUrl)
            .map(res => res.json() as FormData[])
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
        return this.http.post(this.serviceUrl, params, options)
            .catch(err => this.handleError(err));
    }

    private handleError(error: any) {
        console.error(error.message || error);
        return Observable.throw(error);
    }
}