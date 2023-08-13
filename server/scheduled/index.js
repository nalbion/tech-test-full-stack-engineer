const CronJob = require('node-cron');
const { refreshShips } = require('./refresh-ships');

exports.initScheduledJobs = () => {
    const scheduledShipRefresh = CronJob.schedule('0 0 * * *', refreshShips);

    scheduledShipRefresh.start();
}
