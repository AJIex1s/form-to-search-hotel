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
var CheckOptionComponent = (function () {
    function CheckOptionComponent() {
    }
    __decorate([
        core_1.Input('name'),
        __metadata("design:type", String)
    ], CheckOptionComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input('selected'),
        __metadata("design:type", Boolean)
    ], CheckOptionComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input('stateControl'),
        __metadata("design:type", forms_1.FormControl)
    ], CheckOptionComponent.prototype, "stateControl", void 0);
    CheckOptionComponent = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'check-option',
            templateUrl: 'check-option.component.html',
            styleUrls: ['check-option.component.css']
        })
    ], CheckOptionComponent);
    return CheckOptionComponent;
}());
exports.CheckOptionComponent = CheckOptionComponent;
//# sourceMappingURL=check-option.component.js.map