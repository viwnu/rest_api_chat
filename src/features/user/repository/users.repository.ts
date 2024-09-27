import { User } from '../domain/user';

export abstract class UsersRepository {
  abstract save(user: User): Promise<User>;
  abstract findManyByIds(ids: string[]): Promise<User[]>;
  abstract findById(id: string): Promise<User>;
  abstract findByName(username: string): Promise<User>;
}
