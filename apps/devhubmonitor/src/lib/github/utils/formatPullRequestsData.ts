export function formatPullRequestsData (pullRequestsResponse: any) {
  return pullRequestsResponse.data.map((pullRequest: any) => ({
    id: pullRequest.id,
    title: pullRequest.title,
    user: {
      login: pullRequest.user.login,
    },
    state: pullRequest.state,
    created_at: pullRequest.created_at,
    updated_at: pullRequest.updated_at,
    closed_at: pullRequest.closed_at,
    merged_at: pullRequest.merged_at,
    duration: calculatePullRequestDuration(
      pullRequest.created_at,
      pullRequest.merged_at,
    ),
  }));
}

function calculatePullRequestDuration (
  created_at: string,
  merged_at: string | null,
): string | null {
  const createdAt = new Date(created_at);
  const mergedAt = merged_at ? new Date(merged_at) : null;
  const durationHm = mergedAt
    ? Math.abs(mergedAt.getTime() - createdAt.getTime())
    : null;
  if (durationHm !== null) {
    const durationSec = Math.floor(durationHm / 1000);
    const hours = Math.floor(durationSec / 3600);
    const minutes = Math.floor((durationSec % 3600) / 60);
    return `${hours}h ${minutes}m`;
  } else {
    return null;
  }
}
