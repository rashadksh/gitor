import { CronJob } from 'cron';

import { UpdateDataService } from '../../service/updateRepositoriesData';

const updateDataService = new UpdateDataService();

export const startCronJob = async () => {
  const job = new CronJob('0 */4  * * * ', () => {
    updateDataService.updateRepositoriesData();
  });

  job.start();
};
