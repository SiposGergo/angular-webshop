import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { UserInterface } from '../../auth/model/user.interface';
import { AuthState } from '../../auth/state/auth.state';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    untilDestroyed(this),
    map(result => result.matches)
  );

  loggedInUser: UserInterface | undefined;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) {
    this.store
      .select(AuthState.user)
      .pipe(untilDestroyed(this))
      .subscribe(loggedInUser => (this.loggedInUser = loggedInUser));
  }

  ngOnDestroy(): void {}
}
