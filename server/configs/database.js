const mongoose = require('mongoose');

const { CronJob } = require('cron');

const stashPriceInterval = require('../cronjobs/stashPriceInterval');
const batteryInterval = require('../cronjobs/batteryInterval');
const currencyPriceInterval = require('../cronjobs/currencyPriceInterval');
const dataCenterPayoutInterval = require('../cronjobs/dataCenterPayoutInterval');
const cityPriceInterval = require('../cronjobs/cityPriceInterval');

const currencyPriceJob = new CronJob('5 0 * * * *', (() => {
  console.log('currencyPriceJob started');
  currencyPriceInterval();
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

const batteryJob = new CronJob('55 59 * * * *', (() => {
  console.log('batteryJob started');
  batteryInterval();
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
    cityMultiplierJob.start();
    currencyPriceJob.start();
    stashPriceJob.start();
    dataCenterPayoutJob.start();
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });
