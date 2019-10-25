import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from './modules/auth/guards/user-logged-in.guard';
import { UserLoggedOutGuard } from './modules/auth/guards/user-logged-out.guard';
import { UserIsAdminGuard } from './modules/auth/guards/user-is-admin.guard';

const routes: Routes = [
  { path: '', loadChildren: 'src/app/modules/home/home.module#HomeModule' },
  { path: 'login', loadChildren: 'src/app/modules/login/login.module#LoginModule', canActivate: ['isUserLoggedOut'] },
  {
    path: 'logout',
    loadChildren: 'src/app/modules/logout/logout.module#LogoutModule',
    canActivate: ['isUserLoggedIn']
  },
  { path: 'tax', loadChildren: 'src/app/modules/tax/tax.module#TaxModule', canActivate: ['isUserAdmin'] },
  {
    path: 'product-category',
    loadChildren: 'src/app/modules/product-category/product-category.module#ProductCategoryModule',
    canActivate: ['isUserAdmin']
  },
  {
    path: 'product',
    loadChildren: 'src/app/modules/product/product.module#ProductModule',
    canActivate: ['isUserAdmin']
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: 'isUserLoggedIn', useClass: UserLoggedInGuard },
    { provide: 'isUserLoggedOut', useClass: UserLoggedOutGuard },
    { provide: 'isUserAdmin', useClass: UserIsAdminGuard }
  ]
})
export class AppRoutingModule {}
