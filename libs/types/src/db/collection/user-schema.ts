export interface IUserSchema {
  _id: string;
  email: string;
  password: string;
  githubToken?: string;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  isVerified: boolean;
  refreshToken?: string;
  gitHubRepoData?: {
    name: string;
    full_name: string;
    owner: {
      login: string;
      url: string;
    };
    created_at: Date | string;
    updated_at: Date | string;
    stars: number;
    visibility: string;
    watchers: number;
    language: string;
    pull_requests: [
      {
        id: string;
        title: string;
        user: {
          login: string;
        };
        state: string;
        created_at: Date | string;
        updated_at: Date | string;
        closed_at: Date | string;
        merged_at: Date | string;
      },
    ];
  };
}
