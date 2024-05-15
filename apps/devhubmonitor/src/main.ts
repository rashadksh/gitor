/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { CronJob } from 'cron';

import { GLOBALPREFIX, PORT } from './config';
import userController from './controller/authController';
import gitHubTokenServiceController from './controller/gitHubTokenController';
import userDataController from './controller/userDataController';
import { UpdateDataService } from './service/updateRepositoriesData';
import connectToDatabase from './infra/db.provider';
import { startCronJob } from './lib/schedule/cronJob';

const updateDataService = new UpdateDataService();

const app = express();
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  }),
);
const runCronJob = async () => {
  const job = new CronJob('*/10 * * * * *', async () => {
    await updateDataService.updateRepositoriesData();
  });

  await job.start();
};
const cors = require('cors');
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(
  `/${GLOBALPREFIX}`,
  userController,
  gitHubTokenServiceController,
  userDataController,
);
async function main () {
  try {
    await connectToDatabase();
    app.listen(PORT, async () => {
      console.log(`Listening at http://localhost:${PORT}`);
      await runCronJob();
    });
    await startCronJob();
  } catch (e) {
    console.log(e);
  }
}
main();
