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
require("rxjs/add/operator/startWith");
require("rxjs/add/operator/map");
var DateRangeComponent = (function () {
    function DateRangeComponent() {
    }
    DateRangeComponent.prototype.ngAfterContentChecked = function () {
        var _this = this;
        this.checkInStateControl.valueChanges
            .startWith(null)
            .subscribe(function (value) { return _this.checkInChanged(value); });
        this.checkOutStateControl.valueChanges
            .startWith(null)
            .subscribe(function (value) { return _this.checkOutChanged(value); });
    };
    DateRangeComponent.prototype.checkInChanged = function (date) {
        if (!date)
            return;
        this.checkInDate = date;
        if (this.checkInDate > this.checkOutDate || !this.checkOutDate) {
            this.checkOutDate = new Date(this.checkInDate);
            this.checkOutDate.setDate(this.checkInDate.getDate() + 1);
            this.checkOutStateControl.setValue(this.checkOutDate);
        }
    };
    DateRangeComponent.prototype.checkOutChanged = function (date) {
        if (!date)
            return;
        this.checkOutDate = date;
        if (this.checkInDate > this.checkOutDate || !this.checkInDate) {
            this.checkInDate = new Date(this.checkOutDate);
            this.checkInDate.setDate(this.checkOutDate.getDate() - 1);
            this.checkInStateControl.setValue(this.checkInDate);
        }
    };
    __decorate([
        core_1.Input('checkInStateControl'),
        __metadata("design:type", forms_1.FormControl)
    ], DateRangeComponent.prototype, "checkInStateControl", void 0);
    __decorate([
        core_1.Input('checkOutStateControl'),
        __metadata("design:type", forms_1.FormControl)
    ], DateRangeComponent.prototype, "checkOutStateControl", void 0);
    DateRangeComponent = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'date-range',
            templateUrl: 'date-range.component.html',
            styleUrls: ['date-range.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], DateRangeComponent);
    return DateRangeComponent;
}());
exports.DateRangeComponent = DateRangeComponent;
//# sourceMappingURL=date-range.component.js.map