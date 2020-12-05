const mongoose = require('mongoose');

const { CronJob } = require('cron');

const stashPriceInterval = require('../cronjobs/stashPriceInterval');
const batteryInterval = require('../cronjobs/batteryInterval');
const bonusBatteryInterval = require('../cronjobs/bonusBatteryInterval');
const currencyPriceInterval = require('../cronjobs/currencyPriceInterval');
const dataCenterPayoutInterval = require('../cronjobs/dataCenterPayoutInterval');
const cityPriceInterval = require('../cronjobs/cityPriceInterval');

const batteryJob = new CronJob('2 */0,10,20,30,40,50 * * * *', (() => {
  console.log('batteryJob started');
  batteryInterval();
}), null, true, 'America/Los_Angeles');

const currencyPriceJob = new CronJob('6 0 * * * *', (() => {
  console.log('currencyPriceJob started');
  currencyPriceInterval();
}), null, true, 'America/Los_Angeles');

const bonusBatteryJob = new CronJob('10 0 * * * *', (() => {
  console.log('bonusBatteryJob started');
  console.log(new Date(Date.now()));
  bonusBatteryInterval();
}), null, true, 'America/Los_Angeles');

const stashPriceJob = new CronJob('15 59 * * * *', (() => {
  console.log('stashPriceJob started');
  stashPriceInterval();
}), null, true, 'America/Los_Angeles');

const dataCenterPayoutJob = new CronJob('30 * * * * *', (() => {
  console.log('dataCenterPayoutInterval started');
  dataCenterPayoutInterval();
}), null, true, 'America/Los_Angeles');

const cityMultiplierJob = new CronJob('45 59 * * * *', (() => {
  console.log('cityMultiplierJob started');
  cityPriceInterval();
}), null, true, 'America/Los_Angeles');

const uri = process.env.MONGODB_URI
  || 'mongodb://localhost/please-set-process-env-mongodb-uri';

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    );
  })
  .then(() => {
    batteryJob.start();
    bonusBatteryJob.start();
    cityMultiplierJob.start();
    currencyPriceJob.start();
    stashPriceJob.start();
    dataCenterPayoutJob.start();
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });
