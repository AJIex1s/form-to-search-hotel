import { destinationPlaces, tripOptions } from './static-data';
import { Option } from './classes';

export class FormContentService {
    getDestinationPlaces(): string[] {
        return destinationPlaces;
    }
    
    getTripOptions(): Option[] {
        return tripOptions;
    }
}