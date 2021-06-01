import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // { path: '**', component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true, relativeLinkResolution: 'legacy' });
