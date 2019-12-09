import {Home} from './home';
import {User} from './user';

export interface IComment {
  id?: number;
  comment?: string;
  date?: string;
  edit?: boolean;
  idHome?: number;
  home?: Home;
  user?: User;
}
