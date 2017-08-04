"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var material_1 = require("@angular/material");
var app_component_1 = require("./app.component");
var search_form_component_1 = require("./search-form/search-form.component");
var search_field_component_1 = require("./search-form/search-field/search-field.component");
var date_range_component_1 = require("./search-form/date-range/date-range.component");
var option_list_component_1 = require("./search-form/option-list/option-list.component");
var check_option_component_1 = require("./search-form/check-option/check-option.component");
var radio_option_component_1 = require("./search-form/radio-option/radio-option.component");
var search_requests_list_component_1 = require("./search-requests/search-requests.component");
var formData_service_1 = require("./shared/formData.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule, material_1.MdButtonModule,
                material_1.MdCheckboxModule, material_1.MdGridListModule, material_1.MdAutocompleteModule,
                forms_1.ReactiveFormsModule, forms_1.FormsModule, material_1.MdInputModule, material_1.MdDatepickerModule,
                material_1.MdNativeDateModule, material_1.MdRadioModule, material_1.MdListModule, material_1.MdSelectModule,
                material_1.MdTableModule, forms_1.FormsModule, http_1.HttpModule, material_1.MdIconModule,
                router_1.RouterModule.forRoot(app_routes_1.rootRouterConfig, { useHash: false })],
            declarations: [
                app_component_1.AppComponent,
                search_form_component_1.BookingForm,
                search_field_component_1.SearchFieldComponent,
                date_range_component_1.DateRangeComponent,
                option_list_component_1.OptionListComponent,
                check_option_component_1.CheckOptionComponent,
                radio_option_component_1.RadioOptionComponent,
                search_requests_list_component_1.SearchRequestsListComponent
            ],
            providers: [formData_service_1.FormDataService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map