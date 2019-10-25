import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: 'src/app/modules/tax/list/list.module#ListModule' },
  { path: ':id', loadChildren: 'src/app/modules/tax/form/form.module#FormModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule {}
