import axios from 'axios';

import { BASE_GITHUB_URL } from '../../config';

import {
  formatPullRequestsData,
  mergeReposWithPulls,
  handleResponseError,
} from './utils';

const axiosInstance = axios.create({
  baseURL: BASE_GITHUB_URL,
});

export class GitHubConnectionService {
  async getRepositories (githubToken: string) {
    try {
      const repositoriesResponse = await axiosInstance.get('/user/repos', {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
      return repositoriesResponse.data;
    } catch (e) {
      handleResponseError(e);
    }
  }
  async getPullRequests (repoFullName: string, githubToken: string) {
    try {
      const pullRequestsResponse = await axiosInstance.get(
        `/repos/${repoFullName}/pulls`,
        {
          headers: { Authorization: `token ${githubToken}` },
          params: { state: 'all' },
        },
      );
      const pullRequests = formatPullRequestsData(pullRequestsResponse);
      return pullRequests;
    } catch (e) {
      handleResponseError(e);
    }
  }

  async fetchData (githubToken: string) {
    const repositories = await this.getRepositories(githubToken);
    const repositoriesWithPullRequests = await mergeReposWithPulls(
      repositories,
      this.getPullRequests,
      githubToken,
    );
    return repositoriesWithPullRequests;
  }
}
