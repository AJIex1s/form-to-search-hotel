import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    private readonly APP_DATA_SERVICE_URL = "http://localhost:38127/api/dataservice/";

    GetDataServiceURL() {
        return this.APP_DATA_SERVICE_URL;
    }
}