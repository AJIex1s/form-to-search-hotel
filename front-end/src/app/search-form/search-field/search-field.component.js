"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var formData_service_1 = require("../../shared/formData.service");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/map");
var SearchFieldComponent = (function () {
    function SearchFieldComponent(formDataService) {
        this.formDataService = formDataService;
        this.destinationPlaces = [];
    }
    SearchFieldComponent.prototype.ngOnInit = function () {
        this.destinationPlaces = this.formDataService.getDestinationPlaces();
    };
    SearchFieldComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.filteredDestinationPlaces = this.stateControl.valueChanges
            .startWith(null)
            .map(function (name) { return _this.filterDestinationPlaces(name); });
    };
    SearchFieldComponent.prototype.filterDestinationPlaces = function (val) {
        var preparedFilterValue;
        if (!val)
            return this.destinationPlaces;
        preparedFilterValue = val.toLowerCase();
        return this.destinationPlaces.filter(function (place) { return place.toLowerCase().indexOf(preparedFilterValue) === 0; });
    };
    __decorate([
        core_1.Input('stateControl'),
        __metadata("design:type", forms_1.FormControl)
    ], SearchFieldComponent.prototype, "stateControl", void 0);
    SearchFieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'search-field',
            templateUrl: 'search-field.component.html',
            styleUrls: ['search-field.component.css']
        }),
        __metadata("design:paramtypes", [formData_service_1.FormDataService])
    ], SearchFieldComponent);
    return SearchFieldComponent;
}());
exports.SearchFieldComponent = SearchFieldComponent;
//# sourceMappingURL=search-field.component.js.map