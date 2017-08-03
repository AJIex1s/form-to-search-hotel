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
var ListTypes = {
    checkList: 'checkList',
    radioList: 'radioList'
};
var OptionListComponent = (function () {
    function OptionListComponent() {
    }
    OptionListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input('options'),
        __metadata("design:type", Array)
    ], OptionListComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input('listType'),
        __metadata("design:type", String)
    ], OptionListComponent.prototype, "listType", void 0);
    __decorate([
        core_1.Input('title'),
        __metadata("design:type", String)
    ], OptionListComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input('parentFormGroup'),
        __metadata("design:type", forms_1.FormGroup)
    ], OptionListComponent.prototype, "parentFormGroup", void 0);
    OptionListComponent = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'option-list',
            templateUrl: 'option-list.component.html',
            styleUrls: ['option-list.component.css']
        })
    ], OptionListComponent);
    return OptionListComponent;
}());
exports.OptionListComponent = OptionListComponent;
//# sourceMappingURL=option-list.component.js.map