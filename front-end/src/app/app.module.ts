import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import {
    MdButtonModule, MdCheckboxModule, MdGridListModule, MdRadioModule,
    MdInputModule, MdAutocompleteModule, MdDatepickerModule, MdNativeDateModule,
    MdListModule, MdSelectModule, MdProgressSpinnerModule, MdProgressBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { DateRangeComponent } from './search-form/date-range/date-range.component';
import { OptionListComponent } from './search-form/option-list/option-list.component';
import { CheckOptionComponent } from './search-form/check-option/check-option.component';
import { RadioOptionComponent } from './search-form/radio-option/radio-option.component';
import { AutocompleteTextBoxComponent } from './search-form/autocomplete/autocomplete.component';

import { SearchRequestsComponent } from './search-requests/search-requests.component';
import { DataGridComponent } from './search-requests/data-grid/data-grid.component';

import { FormDataService } from './shared/form-data.service';
import { FormContentService } from './shared/form-content.service';
import { AppConfig } from './app.config';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, MdButtonModule,
        MdCheckboxModule, MdGridListModule, MdAutocompleteModule,
        ReactiveFormsModule, FormsModule, MdInputModule, MdDatepickerModule,
        MdNativeDateModule, MdRadioModule, MdListModule, MdSelectModule,
        FormsModule, HttpModule, MdProgressSpinnerModule, MdProgressBarModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: false })],
    declarations: [
        AppComponent,
        SearchFormComponent,
        AutocompleteTextBoxComponent,
        DateRangeComponent,
        OptionListComponent,
        CheckOptionComponent,
        RadioOptionComponent,
        DataGridComponent,
        SearchRequestsComponent
    ],
    providers: [FormDataService, FormContentService, AppConfig],
    bootstrap: [AppComponent]
})
export class AppModule {

}