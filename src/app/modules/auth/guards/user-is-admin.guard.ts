import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../state/auth.state';
import { map } from 'rxjs/operators';
import { UserRoleEnum } from '../model/user-role.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserIsAdminGuard implements CanActivate {
  constructor(private store: Store, private matSnackBar: MatSnackBar) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AuthState.user).pipe(
      map(user => {
        if (user !== undefined && user.role === UserRoleEnum.Admin) {
          return true;
        }
        this.matSnackBar.open('Nincs hozzáférése a kért oldalhoz!', 'Bezárás', { duration: 5000 });
        return false;
      })
    );
  }
}
