import { UserInterface } from '../../model/user.interface';

export class LoginAction {
  static readonly type = '[AUTH] login';
  constructor(readonly user: UserInterface) {}
}
