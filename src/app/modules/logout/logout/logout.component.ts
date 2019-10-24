import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LogoutAction } from '../../auth/state/actions/logout.action';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private store: Store) {
    this.store.dispatch(new LogoutAction());
  }
}
