import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessErrorComponent } from './access-error/access-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: 'access-error', component: AccessErrorComponent },
      { path: 'page-not-found', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
