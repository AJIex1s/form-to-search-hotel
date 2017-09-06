import { Injectable } from '@angular/core';
import { destinationPlaces, tripOptions } from './static-data';
import { Option } from './classes';

@Injectable()
export class FormContentService {
    getDestinationPlaces(): string[] {
        return destinationPlaces;
    }
    
    getTripOptions(): Option[] {
        return tripOptions;
    }
}