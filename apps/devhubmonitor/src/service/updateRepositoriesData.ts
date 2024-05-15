import {
  InvalidGitHubTokenError,
  ServerGitHubTokenError,
} from '@dev-hub-monitor/types';

import { MongoTodoRepository } from '../infra/repositories/users-repositories';
import { GitHubConnectionService } from '../lib/github/githubConnectionService';
import { GitHubTokenService } from '../service/gitHubTokenService';

export class UpdateDataService {
  userRepository: MongoTodoRepository;
  githubTokenService: GitHubTokenService;
  gitHubConnectionService: GitHubConnectionService;

  constructor () {
    this.userRepository = new MongoTodoRepository();
    this.githubTokenService = new GitHubTokenService();
    this.gitHubConnectionService = new GitHubConnectionService();
  }

  updateRepositoriesData = async () => {
    try {
      const allUsers = await this.userRepository.getAllUser();
      for (const user of allUsers) {
        try {
          if (user && user.githubToken !== undefined) {
            const newUserData = await this.gitHubConnectionService.fetchData(
              user.githubToken,
            );

            await this.githubTokenService.storeGitHubData(
              user._id,
              newUserData,
            );
          }
        } catch (e) {
          if (e instanceof InvalidGitHubTokenError) {
            await this.userRepository.deleteGitHubToken(user._id);
            console.log('Invalid Token ,You Shoud insert new Token!');
          } else {
            console.log(e);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
}
