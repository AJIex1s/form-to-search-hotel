import { Routes } from '@angular/router';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchRequestsComponent } from './search-requests/search-requests.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'app/searchForm/', pathMatch: 'full' },
  { path: 'app/searchForm', redirectTo: 'app/searchForm/', pathMatch: 'full' },
  { path: 'app', redirectTo: 'app/searchForm/', pathMatch: 'full' },
  { path: 'app/', redirectTo: 'app/searchForm/', pathMatch: 'full' },
  { path: 'app/searchRequests', redirectTo: 'app/searchRequests/', pathMatch: 'full' },
  
  { path: 'app/searchForm/', component: SearchFormComponent },
  { path: 'app/searchRequests/', component: SearchRequestsComponent },
];