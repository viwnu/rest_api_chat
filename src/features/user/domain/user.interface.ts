export interface IUser {
  id: string;
  username: string;
  created_At: Date;
}

export interface UserBuildResponse {
  id: string;
  username: string;
  created_At: string;
}
