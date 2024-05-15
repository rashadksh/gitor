import { InvalidGitHubTokenError } from '@dev-hub-monitor/types';
import { decodeToken } from '@dev-hub-monitor/utils';
import express, { Response, Request } from 'express';

import { GitHubConnectionService } from '../lib/github/githubConnectionService';

import { GitHubTokenService } from './../service/gitHubTokenService';

const router = express.Router();
const gitHubTokenService = new GitHubTokenService();
const gitHubConnectionService = new GitHubConnectionService();

router.post('/auth/github', async (req: Request, res: Response) => {
  const userId = decodeToken(req.cookies.refreshToken);
  const githubToken = req.body.githubToken;

  try {
    if (!githubToken) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    const userData = await gitHubConnectionService.fetchData(githubToken);
    const saveToken = await gitHubTokenService.storeGitHubToken({
      userId,
      githubToken,
    });
    console.log(userData);
    await gitHubTokenService.storeGitHubData(userId, userData);
    return res.status(200).json({ gitHubToken: saveToken });
  } catch (e) {
    switch (true) {
      case e instanceof InvalidGitHubTokenError:
        return res.status(401).json({ message: e.message });
      default:
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

export default router;
