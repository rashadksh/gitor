const mergeRepoData = (repo: any, pullRequests: any) => {
  return {
    name: repo.name,
    full_name: repo.full_name,
    owner: {
      login: repo.owner.login,
      url: repo.owner.url,
    },
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    stars: repo.stargazers_count,
    visibility: repo.visibility,
    watchers: repo.watchers_count,
    language: repo.language,
    pull_requests: pullRequests,
  };
};

export async function mergeReposWithPulls (
  repositories: any[],
  getPullRequests: any,
  githubToken: string,
) {
  const repositoriesWithPullRequests = [];
  for (const repo of repositories) {
    const pullRequests = await getPullRequests(repo.full_name, githubToken);
    const pullRequestss = JSON.stringify(pullRequests);
    const repositoryInfo = mergeRepoData(repo, pullRequestss);

    repositoriesWithPullRequests.push(repositoryInfo);
  }
  return repositoriesWithPullRequests;
}
