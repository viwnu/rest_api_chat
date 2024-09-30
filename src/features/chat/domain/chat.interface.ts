import { IUser, UserBuildResponse } from 'src/features/user/domain';

export interface IChat {
  id: string;
  name: string;
  users: IUser[];
  created_At: Date;
}

export interface ChatBuildResponse {
  id: string;
  name: string;
  users: UserBuildResponse[];
  created_At: string;
}
