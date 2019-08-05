const mongoose = require('mongoose');
const stashPriceInterval = require('../intervals/stashPriceInterval');
const batteryInterval = require('../intervals/batteryInterval');

// Don't forget to set "MONGODB_URI" in ~/server/.env
const uri =
  process.env.MONGODB_URI ||
  `mongodb://localhost/please-set-process-env-mongodb-uri`;

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .then(() => {
    /* Gives user more energy every 30 minute */
    console.log('SERVER: battery interval started');
    setInterval(batteryInterval, 30 * 60 * 1000);
  })
  .then(() => {
    /* Changes the stash price every 30 minute */
    console.log('SERVER: stash price interval started');
    setInterval(stashPriceInterval, 60 * 60 * 1000);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });
