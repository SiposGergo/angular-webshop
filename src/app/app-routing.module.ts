import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoggedInGuard } from './modules/auth/guards/user-logged-in.guard';
import { UserLoggedOutGuard } from './modules/auth/guards/user-logged-out.guard';

const routes: Routes = [
  { path: 'login', loadChildren: 'src/app/modules/login/login.module#LoginModule', canActivate: ['isUserLoggedOut'] },
  { path: '', loadChildren: 'src/app/modules/home/home.module#HomeModule' },
  { path: 'logout', loadChildren: 'src/app/modules/logout/logout.module#LogoutModule', canActivate: ['isUserLoggedIn'] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: 'isUserLoggedIn', useClass: UserLoggedInGuard },
    { provide: 'isUserLoggedOut', useClass: UserLoggedOutGuard }
  ]
})
export class AppRoutingModule {}
