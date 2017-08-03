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
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var formData_service_1 = require("../shared/formData.service");
var BookingForm = (function () {
    function BookingForm(cd, formDataService) {
        var _this = this;
        this.cd = cd;
        this.formDataService = formDataService;
        this.tripOptions = [
            { controlName: 'freeCancelation', name: 'free cancellation', selected: false },
            { controlName: 'breakFastIn', name: 'breakfast included', selected: false },
            { controlName: 'freeWiFi', name: 'free wifi', selected: false },
            { controlName: 'parking', name: 'parking', selected: false },
            { controlName: 'fishing', name: 'fishing', selected: false },
            { controlName: 'bar', name: 'bar', selected: false }
        ];
        this.bookingForm = new forms_1.FormGroup({
            'searchFieldStateControl': new forms_1.FormControl(),
            'checkInStateControl': new forms_1.FormControl(),
            'checkOutStateControl': new forms_1.FormControl(),
            'tripForWork': new forms_1.FormControl(false),
            'tripNotForWork': new forms_1.FormControl(true)
        });
        this.tripOptions.forEach(function (option) {
            _this.bookingForm.addControl(option.controlName, new forms_1.FormControl(false));
        });
    }
    BookingForm.prototype.ngAfterViewInit = function () {
        var tripOptionsCount = this.tripOptions.length;
        var optionsRowCount = Math.ceil(tripOptionsCount / 3);
        this.tripOptionsContainer.rowspan = optionsRowCount + 1;
    };
    //workaround for ExpressionChangedAfterItHasBeenCheckedError
    BookingForm.prototype.ngAfterContentInit = function () {
        this.cd.detectChanges();
    };
    BookingForm.prototype.prepareFieldName = function (name) {
        return name.split(/(?=[A-Z])/)
            .map(function (part) { return part.toLowerCase(); })
            .join(' ')
            .replace('state', '')
            .replace('control', '');
    };
    BookingForm.prototype.onBookingFormSubmit = function (event) {
        event.preventDefault();
        var jsonData = {};
        var preparedName = "";
        for (var controlName in this.bookingForm.controls) {
            if (this.bookingForm.controls.hasOwnProperty(controlName)) {
                var element = this.bookingForm.controls[controlName];
                preparedName = this.prepareFieldName(controlName);
                if (controlName != "tripNotForWork") {
                    if (element.value instanceof Date)
                        jsonData[preparedName] = element.value.toLocaleDateString();
                    else
                        jsonData[preparedName] = element.value.toString();
                }
            }
        }
        this.formDataService.sendSearchRequest(jsonData)
            .subscribe(function (data) { return console.log(data); });
    };
    __decorate([
        core_1.ViewChild('tripOptionsContainer'),
        __metadata("design:type", material_1.MdGridTile)
    ], BookingForm.prototype, "tripOptionsContainer", void 0);
    BookingForm = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: "search-form",
            templateUrl: "search-form.component.html",
            styleUrls: ["search-form.component.css"]
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef, formData_service_1.FormDataService])
    ], BookingForm);
    return BookingForm;
}());
exports.BookingForm = BookingForm;
//# sourceMappingURL=search-form.component.js.map