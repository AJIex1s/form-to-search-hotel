import { Routes } from '@angular/router';
import { BookingForm } from './search-form/search-form.component';
import { SearchRequestsListComponent } from './search-requests-list/search-requests-list.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'app/searchForm/', pathMatch: 'full' },
  { path: 'app/searchForm', redirectTo: 'app/searchForm/', pathMatch: 'full' },
  { path: 'app', redirectTo: 'app/searchForm/', pathMatch: 'full' },
  { path: 'app/', redirectTo: 'app/searchForm/', pathMatch: 'full' },
  { path: 'app/searchRequests', redirectTo: 'app/searchRequests/', pathMatch: 'full' },
  
  { path: 'app/searchForm/', component: BookingForm },
  { path: 'app/searchRequests/', component: SearchRequestsListComponent },
];