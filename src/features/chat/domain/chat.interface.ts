import { User } from 'src/features/user/domain/user';

export interface IChat {
  id: string;
  name: string;
  users: User[];
  created_At: string;
}
