import { Injectable } from '@angular/core';
import { destinationPlaces } from './data';
import { SearchRequest, FormData } from './classes';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GetFormattedDate } from './dateHelper';
import { ServiceUrl } from '../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FormDataService {
    private destinationPlaces: string[] = destinationPlaces;
    private searchRequests: SearchRequest[] = [];
    private serviceUrl = ServiceUrl;

    constructor(private http: Http) { }

    getDestinationPlaces(): string[] {
        return this.destinationPlaces;
    }

    getSearchRequestsData(): Observable<SearchRequest[]> {
        let searchRequests: SearchRequest[] = [];
        return this.http.get(this.serviceUrl)
            .map(res => res.json() as FormData[])
            .map(formsData => {
                return formsData.map(formData => new SearchRequest(GetFormattedDate(formData.Sended), formData.FieldsValues));
            })
            .catch(err => this.handleError(err));
    }

    sendSearchRequest(params: any): Observable<Response> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers });
        console.log(params);
        return this.http.post(this.serviceUrl, params, options)
            .catch(err => this.handleError(err));
    }

    private handleError(error: any) {
        console.error(error.message || error);
        return Observable.throw(error);
    }
}