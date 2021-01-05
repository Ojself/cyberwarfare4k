const mongoose = require('mongoose');
const { CronJob } = require('cron');
// /usr/share/zoneinfo  <-- Timezones
const timeZone = 'Europe/Oslo';

const uri = process.env.MONGODB_URI
  || 'mongodb://localhost/please-set-process-env-mongodb-uri';

const stashPriceInterval = require('../cronjobs/stashPriceInterval');
const batteryInterval = require('../cronjobs/batteryInterval');
const bonusBatteryInterval = require('../cronjobs/bonusBatteryInterval');
const currencyPriceInterval = require('../cronjobs/currencyPriceInterval');
const dataCenterPayoutInterval = require('../cronjobs/dataCenterPayoutInterval');
const cityPriceInterval = require('../cronjobs/cityPriceInterval');
const earnBatteryInterval = require('../cronjobs/earnBatteryInterval');

const earnBatteryIntervalJob = new CronJob('25 * 0 * * *', (() => {
  console.info('earnBatteryIntervalJob started');
  earnBatteryInterval();
}), null, true, timeZone);

const batteryJob = new CronJob('2 */10 * * * *', (() => {
  console.info('batteryJob started');
  batteryInterval();
}), null, true, timeZone);

const currencyPriceJob = new CronJob('6 0 * * * *', (() => {
  console.info('currencyPriceJob started');
  currencyPriceInterval();
}), null, true, timeZone);

const bonusBatteryJob = new CronJob('10 0 * * * *', (() => {
  console.info('bonusBatteryJob started');
  bonusBatteryInterval();
}), null, true, timeZone);

const stashPriceJob = new CronJob('15 59 * * * *', (() => {
  console.info('stashPriceJob started');
  stashPriceInterval();
}), null, true, timeZone);

const dataCenterPayoutJob = new CronJob('30 * * * * *', (() => {
  console.info('dataCenterPayoutInterval started');
  dataCenterPayoutInterval();
}), null, true, timeZone);

const cityMultiplierJob = new CronJob('45 59 * * * *', (() => {
  console.info('cityMultiplierJob started');
  cityPriceInterval();
}), null, true, timeZone);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.info(`Connected to MongoDB! Database name: "${db.connections[0].name}"`))
  .then(() => {
    batteryJob.start();
    bonusBatteryJob.start();
    cityMultiplierJob.start();
    currencyPriceJob.start();
    stashPriceJob.start();
    dataCenterPayoutJob.start();
    earnBatteryIntervalJob.start(); // <-- Might be depricated TODO
  })
  .catch((err) => console.error('Error connecting to mongo', err));
mongoose.set('useCreateIndex', true);
