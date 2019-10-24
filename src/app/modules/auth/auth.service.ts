import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { UserInterface } from './model/user.interface';
import { UserRoleEnum } from './model/user-role.enum';
import { delay, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor() {}

  public authenticate({ userName, password }): Observable<UserInterface> {
    if (userName === 'bela' && password === 'joska') {
      return of({ userName: 'Kovács Béla', role: UserRoleEnum.Admin }).pipe(delay(1500));
    }
    return timer(1500).pipe(switchMap(() => throwError({})));
  }
}
