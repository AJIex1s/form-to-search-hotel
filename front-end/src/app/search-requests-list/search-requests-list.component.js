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
var formData_service_1 = require("../shared/formData.service");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/map");
var SearchRequestsListComponent = (function () {
    function SearchRequestsListComponent(formDataService) {
        this.formDataService = formDataService;
        this.searchRequests = [];
        this.dataFieldsCount = 0;
        this.fieldNames = [];
        this.searchFieldStateControl = new forms_1.FormControl();
        this.searchRequestsForm = new forms_1.FormGroup({
            'searchFieldControl': this.searchFieldStateControl
        });
    }
    SearchRequestsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formDataService.getSearchRequestsData()
            .subscribe(function (res) { return _this.prepareInternalData(res); });
    };
    SearchRequestsListComponent.prototype.filterSearchRequests = function (val) {
        console.log(val);
        if (!val) {
            this.searchRequests.forEach(function (req) { return req.fields.forEach(function (f) { return f.needToHighlight = false; }); });
            return this.searchRequests;
        }
        var preparedFilterValue = val.toLowerCase();
        var isFieldAffectedByFilter = false;
        var needToShowRequest = false;
        return this.searchRequests.filter(function (request) {
            needToShowRequest = false;
            request.fields.forEach(function (field) {
                isFieldAffectedByFilter = field.value.toString().toLowerCase().indexOf(preparedFilterValue) > -1;
                field.needToHighlight = isFieldAffectedByFilter;
                if (!needToShowRequest && isFieldAffectedByFilter)
                    needToShowRequest = true;
            });
            return needToShowRequest;
        });
    };
    SearchRequestsListComponent.prototype.needToRenderCheckBox = function (field) {
        return field.value == 'true' || field.value == 'false';
    };
    SearchRequestsListComponent.prototype.prepareInternalData = function (searchRequests) {
        var _this = this;
        this.searchRequests = searchRequests;
        if (searchRequests.length > 0) {
            this.fieldNames = searchRequests[0].fields.map(function (field) { return field.name; });
            this.dataFieldsCount = searchRequests[0].fields.length;
        }
        this.filteredSearchRequests = this.searchFieldStateControl.valueChanges
            .startWith(null)
            .map(function (name) { return _this.filterSearchRequests(name); });
    };
    SearchRequestsListComponent.prototype.checkBoxClick = function (event) {
        event.preventDefault();
    };
    SearchRequestsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'search-requests-list',
            templateUrl: 'search-requests-list.component.html',
            styleUrls: ['search-requests-list.component.css']
        }),
        __metadata("design:paramtypes", [formData_service_1.FormDataService])
    ], SearchRequestsListComponent);
    return SearchRequestsListComponent;
}());
exports.SearchRequestsListComponent = SearchRequestsListComponent;
//# sourceMappingURL=search-requests-list.component.js.map