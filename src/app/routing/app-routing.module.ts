import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  // {
  //   path: 'plan',
  //   loadChildren: () => import('./layout/pages/admon/plan/plan.module').then(m => m.PlanModule)
  // },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      useHash: true,
    }),
  ],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
