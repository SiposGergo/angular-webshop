import { UserInterface } from '../model/user.interface';

export interface AuthStateInterface {
  user: UserInterface | undefined;
}
