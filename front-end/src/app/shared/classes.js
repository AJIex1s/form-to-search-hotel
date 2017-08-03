"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormData = (function () {
    function FormData() {
    }
    return FormData;
}());
exports.FormData = FormData;
var Field = (function () {
    function Field(name, value) {
        this.name = name;
        this.value = value;
        this.needToHighlight = false;
    }
    return Field;
}());
exports.Field = Field;
var SearchRequest = (function () {
    function SearchRequest(received, value) {
        var _this = this;
        this.received = received;
        this.value = value;
        this.fields = [];
        this.jsonFields = JSON.parse(this.value);
        this.fields = Object.keys(this.jsonFields).map(function (key) { return new Field(key, _this.jsonFields[key]); });
    }
    return SearchRequest;
}());
exports.SearchRequest = SearchRequest;
//# sourceMappingURL=classes.js.map