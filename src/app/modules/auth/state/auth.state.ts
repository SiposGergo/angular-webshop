import { Action, Selector, State } from '@ngxs/store';
import { AuthStateInterface } from './auth.state.interface';
import { LoginAction } from './actions/login.action';
import { LogoutAction } from './actions/logout.action';

@State<AuthStateInterface>({ name: 'auth', defaults: { user: undefined } })
export class AuthState {
  @Selector()
  static user(state: AuthStateInterface) {
    return state.user;
  }

  @Action(LoginAction)
  loginAction({ setState }, { user }) {
    setState({ user });
  }

  @Action(LogoutAction)
  logoutAction({ setState }) {
    setState({ user: undefined });
  }
}
