import { destinationPlaces, tripOptions } from './data';
import { Option } from './classes';

export class FormContentService {
    private destinationPlaces: string[] = destinationPlaces;
    getDestinationPlaces(): string[] {
        return this.destinationPlaces;
    }
    
    getTripOptions(): Option[] {
        return tripOptions;
    }
}