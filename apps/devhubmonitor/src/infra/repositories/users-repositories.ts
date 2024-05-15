import {
  IInsertUserInput,
  IUserRepository,
  IUserSchema,
} from '@dev-hub-monitor/types';
import { ObjectId } from 'mongodb';

import UserModel from '../../module/users-schema';

export class MongoTodoRepository implements IUserRepository {
  async insertUser (user: IInsertUserInput): Promise<IUserSchema> {
    const newUser = {
      _id: new ObjectId().toString(),
      ...user,
    };
    await UserModel.create(newUser);
    return this.getUserById(newUser._id);
  }
  async insertToken (id: string, token: string): Promise<IUserSchema> {
    await UserModel.findOneAndUpdate(
      { _id: id },
      { githubToken: token },
      { new: true },
    );
    return this.getUserById(id);
  }
  async deleteGitHubToken (id: string): Promise<IUserSchema> {
    await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        $unset: {
          githubToken: 1,
        },
      },
    );
    return this.getUserById(id);
  }
  async updateUserById (
    id: string,
    data: Partial<IUserSchema>,
  ): Promise<IUserSchema> {
    await UserModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    return this.getUserById(id);
  }
  async insertGitHubData (
    id: string,
    githubData: IInsertUserInput,
  ): Promise<IUserSchema> {
    await UserModel.findByIdAndUpdate(
      { _id: id },
      { gitHubRepoData: githubData },
      { new: true },
    );
    return this.getUserById(id);
  }
  async getAllUser () {
    const users = await UserModel.find({});
    return users;
  }
  async getUserByEmail (email: string): Promise<IUserSchema> {
    const user = await UserModel.findOne({ email });
    return user;
  }
  getUserById (id: string): Promise<IUserSchema> {
    const user = UserModel.findById({ _id: id });
    return user;
  }
}
