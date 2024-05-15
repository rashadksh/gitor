import {
  IInsertUserInput,
  IBasicGitHubTokenInput,
} from '@dev-hub-monitor/types';

import { MongoTodoRepository } from '../infra/repositories/users-repositories';

export class GitHubTokenService {
  userRepository: MongoTodoRepository;

  constructor () {
    this.userRepository = new MongoTodoRepository();
  }

  async storeGitHubData (id: string, data: any) {
    const insertedData = await this.userRepository.insertGitHubData(id, data);
    console.log(insertedData);
    return insertedData;
  }

  async storeGitHubToken (input: IBasicGitHubTokenInput) {
    const insertedToken = await this.userRepository.insertToken(
      input.userId,
      input.githubToken,
    );
    return insertedToken.githubToken;
  }
}
