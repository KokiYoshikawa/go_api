import { AuthInitialState } from '../../redux/authentification/Auth';
import { LoggedInInitialState } from '../../redux/login/LoggedIn';

export type LoginAndAuth = {
  auth: AuthInitialState;
  loggedIn: LoggedInInitialState;
}