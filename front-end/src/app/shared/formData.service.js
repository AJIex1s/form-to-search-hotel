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
var data_1 = require("./data");
var classes_1 = require("./classes");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var FormDataService = (function () {
    function FormDataService(http) {
        this.http = http;
        this.destinationPlaces = data_1.destinationPlaces;
        this.searchRequests = [];
        this.apiUrl = 'http://localhost:11997/dataservice/';
    }
    FormDataService.prototype.getDestinationPlaces = function () {
        return this.destinationPlaces;
    };
    FormDataService.prototype.getSearchRequestsData = function () {
        var _this = this;
        var searchRequests = [];
        return this.http.get(this.apiUrl)
            .map(function (res) { return res.json(); })
            .map(function (formsData) {
            return formsData.map(function (formData) { return new classes_1.SearchRequest(_this.formatDate(formData.Received), formData.Value); });
        })
            .catch(function (err) { return _this.handleError(err); });
    };
    FormDataService.prototype.sendSearchRequest = function (params) {
        var _this = this;
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(params);
        return this.http.post(this.apiUrl, params, options)
            .catch(function (err) { return _this.handleError(err); });
    };
    FormDataService.prototype.handleError = function (error) {
        console.error(error.message || error);
        return Observable_1.Observable.throw(error);
    };
    FormDataService.prototype.formatDate = function (date) {
        return new Date(date).toLocaleDateString();
    };
    FormDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], FormDataService);
    return FormDataService;
}());
exports.FormDataService = FormDataService;
//# sourceMappingURL=formData.service.js.map