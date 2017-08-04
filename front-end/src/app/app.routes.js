"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_form_component_1 = require("./search-form/search-form.component");
var search_requests_list_component_1 = require("./search-requests/search-requests.component");
exports.rootRouterConfig = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'searchRequests', component: search_requests_list_component_1.SearchRequestsListComponent },
    { path: 'searchRequests/', component: search_requests_list_component_1.SearchRequestsListComponent },
    { path: 'booking/', component: search_form_component_1.BookingForm },
    { path: 'booking', component: search_form_component_1.BookingForm }
];
//# sourceMappingURL=app.routes.js.map