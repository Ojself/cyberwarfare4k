const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const DataCenter = require('../models/DataCenter');

require('../configs/database');


DataCenter.deleteMany()
  .then(() => {
    const dataCenters = [
      // SHANGHAI
      // SHANGHAI
{ 
    _id : "5fd7c67df260ed00042f3b43", 
    status : "Available", 
    price : 1500000, 
    requiredStash : [
        "5fd7c635382e6600042582f1", 
        "5fd7c635382e6600042582f4", 
        "5fd7c635382e6600042582f2"
    ], 
    currentFirewall : 150, 
    maxFirewall : 150, 
    gracePeriod : false, 
    name : "China Unicom", 
    difficulty : 25, 
    minutlyrevenue : 390, 
    city : "5fae62409cbf7d270f23470b", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b42", 
    status : "Available", 
    price : 1000000, 
    requiredStash : [
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582f2", 
        "5fd7c635382e6600042582f5"
    ], 
    currentFirewall : 90, 
    maxFirewall : 90, 
    gracePeriod : false, 
    name : "China Telecom", 
    difficulty : 20, 
    minutlyrevenue : 280, 
    city : "5fae62409cbf7d270f23470b", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b46", 
    status : "Available", 
    price : 5000000, 
    requiredStash : [
        "5fd7c635382e6600042582f4", 
        "5fd7c635382e6600042582f4", 
        "5fd7c635382e6600042582fd"
    ], 
    currentFirewall : 450, 
    maxFirewall : 450, 
    gracePeriod : false, 
    name : "Range International Data Centre", 
    difficulty : 50, 
    minutlyrevenue : 700, 
    city : "5fae62409cbf7d270f23470b", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b45", 
    status : "Available", 
    price : 3000000, 
    requiredStash : [
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582f5", 
        "5fd7c635382e6600042582fc"
    ], 
    currentFirewall : 270, 
    maxFirewall : 270, 
    gracePeriod : false, 
    name : "Harbin Data Centre", 
    difficulty : 40, 
    minutlyrevenue : 560, 
    city : "5fae62409cbf7d270f23470b", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b44", 
    status : "Available", 
    price : 2000000, 
    requiredStash : [
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582f5", 
        "5fd7c635382e6600042582f2"
    ], 
    currentFirewall : 210, 
    maxFirewall : 210, 
    gracePeriod : false, 
    name : "China Mobile Hohot", 
    difficulty : 30, 
    minutlyrevenue : 465, 
    city : "5fae62409cbf7d270f23470b", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b47", 
    status : "Available", 
    price : 1000000, 
    requiredStash : [
        "5fd7c635382e6600042582f1", 
        "5fd7c635382e6600042582f9", 
        "5fd7c635382e6600042582fe"
    ], 
    currentFirewall : 90, 
    maxFirewall : 90, 
    gracePeriod : false, 
    name : "Telehouse (KDDI)", 
    difficulty : 20, 
    minutlyrevenue : 280, 
    city : "5fae62409cbf7d270f23470e", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b49", 
    status : "Available", 
    price : 2000000, 
    requiredStash : [
        "5fd7c635382e6600042582fa", 
        "5fd7c635382e6600042582fc", 
        "5fd7c635382e6600042582f2"
    ], 
    currentFirewall : 210, 
    maxFirewall : 210, 
    gracePeriod : false, 
    name : "GDS Hanoi Thanglong", 
    difficulty : 30, 
    minutlyrevenue : 465, 
    city : "5fae62409cbf7d270f23470e", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b48", 
    status : "Available", 
    price : 1500000, 
    requiredStash : [
        "5fd7c635382e6600042582f8", 
        "5fd7c635382e6600042582f8", 
        "5fd7c635382e6600042582f2"
    ], 
    currentFirewall : 150, 
    maxFirewall : 150, 
    gracePeriod : false, 
    name : "NTT Communications", 
    difficulty : 25, 
    minutlyrevenue : 390, 
    city : "5fae62409cbf7d270f23470e", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b4a", 
    status : "Available", 
    price : 3000000, 
    requiredStash : [
        "5fd7c635382e6600042582f2", 
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582fb"
    ], 
    currentFirewall : 270, 
    maxFirewall : 270, 
    gracePeriod : false, 
    name : "Tulip Data Centre ", 
    difficulty : 40, 
    minutlyrevenue : 560, 
    city : "5fae62409cbf7d270f23470e", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b4b", 
    status : "Available", 
    price : 5000000, 
    requiredStash : [
        "5fd7c635382e6600042582f7", 
        "5fd7c635382e6600042582fc", 
        "5fd7c635382e6600042582f2"
    ], 
    currentFirewall : 450, 
    maxFirewall : 450, 
    gracePeriod : false, 
    name : "TELEHOUSE Hanoi", 
    difficulty : 50, 
    minutlyrevenue : 700, 
    city : "5fae62409cbf7d270f23470e", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b4e", 
    status : "Available", 
    price : 2000000, 
    requiredStash : [
        "5fd7c635382e6600042582f7", 
        "5fd7c635382e6600042582f4", 
        "5fd7c635382e6600042582fd"
    ], 
    currentFirewall : 210, 
    maxFirewall : 210, 
    gracePeriod : false, 
    name : "Global Switch", 
    difficulty : 30, 
    minutlyrevenue : 465, 
    city : "5fae62409cbf7d270f23470c", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b4d", 
    status : "Available", 
    price : 1500000, 
    requiredStash : [
        "5fd7c635382e6600042582fe", 
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582f7"
    ], 
    currentFirewall : 150, 
    maxFirewall : 150, 
    gracePeriod : false, 
    name : "Next Generation Data", 
    difficulty : 25, 
    minutlyrevenue : 390, 
    city : "5fae62409cbf7d270f23470c", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b4c", 
    status : "Available", 
    price : 1000000, 
    requiredStash : [
        "5fd7c635382e6600042582fb", 
        "5fd7c635382e6600042582fd", 
        "5fd7c635382e6600042582fb"
    ], 
    currentFirewall : 90, 
    maxFirewall : 90, 
    gracePeriod : false, 
    name : "Equinix", 
    difficulty : 20, 
    minutlyrevenue : 280, 
    city : "5fae62409cbf7d270f23470c", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b53", 
    status : "Available", 
    price : 2000000, 
    requiredStash : [
        "5fd7c635382e6600042582f1", 
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582fc"
    ], 
    currentFirewall : 210, 
    maxFirewall : 210, 
    gracePeriod : false, 
    name : "Lakeside Technology Centre", 
    difficulty : 30, 
    minutlyrevenue : 465, 
    city : "5fae62409cbf7d270f23470d", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b4f", 
    status : "Available", 
    price : 3000000, 
    requiredStash : [
        "5fd7c635382e6600042582fe", 
        "5fd7c635382e6600042582fa", 
        "5fd7c635382e6600042582f5"
    ], 
    currentFirewall : 270, 
    maxFirewall : 270, 
    gracePeriod : false, 
    name : "Kao Data Campus", 
    difficulty : 40, 
    minutlyrevenue : 560, 
    city : "5fae62409cbf7d270f23470c", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b50", 
    status : "Available", 
    price : 5000000, 
    requiredStash : [
        "5fd7c635382e6600042582fd", 
        "5fd7c635382e6600042582f4", 
        "5fd7c635382e6600042582f4"
    ], 
    currentFirewall : 450, 
    maxFirewall : 450, 
    gracePeriod : false, 
    name : "Kolos Data Centre", 
    difficulty : 50, 
    minutlyrevenue : 700, 
    city : "5fae62409cbf7d270f23470c", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b51", 
    status : "Available", 
    price : 1000000, 
    requiredStash : [
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582f2", 
        "5fd7c635382e6600042582fa"
    ], 
    currentFirewall : 90, 
    maxFirewall : 90, 
    gracePeriod : false, 
    name : "Digital Realty Trust", 
    difficulty : 20, 
    minutlyrevenue : 280, 
    city : "5fae62409cbf7d270f23470d", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b54", 
    status : "Available", 
    price : 3000000, 
    requiredStash : [
        "5fd7c635382e6600042582fb", 
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582f6"
    ], 
    currentFirewall : 270, 
    maxFirewall : 270, 
    gracePeriod : false, 
    name : "Switch SUPERNAP", 
    difficulty : 40, 
    minutlyrevenue : 560, 
    city : "5fae62409cbf7d270f23470d", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b55", 
    status : "Available", 
    price : 5000000, 
    requiredStash : [
        "5fd7c635382e6600042582f1", 
        "5fd7c635382e6600042582f5", 
        "5fd7c635382e6600042582f7"
    ], 
    currentFirewall : 450, 
    maxFirewall : 450, 
    gracePeriod : false, 
    name : "The Citadel", 
    difficulty : 50, 
    minutlyrevenue : 700, 
    city : "5fae62409cbf7d270f23470d", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b58", 
    status : "Available", 
    price : 2000000, 
    requiredStash : [
        "5fd7c635382e6600042582fa", 
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582f2"
    ], 
    currentFirewall : 210, 
    maxFirewall : 210, 
    gracePeriod : false, 
    name : "Datahouse", 
    difficulty : 30, 
    minutlyrevenue : 465, 
    city : "5fae62409cbf7d270f23470f", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b52", 
    status : "Available", 
    price : 1500000, 
    requiredStash : [
        "5fd7c635382e6600042582fc", 
        "5fd7c635382e6600042582f7", 
        "5fd7c635382e6600042582fe"
    ], 
    currentFirewall : 150, 
    maxFirewall : 150, 
    gracePeriod : false, 
    name : "DuPont Fabros Technology", 
    difficulty : 25, 
    minutlyrevenue : 390, 
    city : "5fae62409cbf7d270f23470d", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b5a", 
    status : "Available", 
    price : 5000000, 
    requiredStash : [
        "5fd7c635382e6600042582fe", 
        "5fd7c635382e6600042582f6", 
        "5fd7c635382e6600042582f6"
    ], 
    currentFirewall : 450, 
    maxFirewall : 450, 
    gracePeriod : false, 
    name : "RTCOMM", 
    difficulty : 50, 
    minutlyrevenue : 700, 
    city : "5fae62409cbf7d270f23470f", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b56", 
    status : "Available", 
    price : 1000000, 
    requiredStash : [
        "5fd7c635382e6600042582f9", 
        "5fd7c635382e6600042582f3", 
        "5fd7c635382e6600042582fb"
    ], 
    currentFirewall : 90, 
    maxFirewall : 90, 
    gracePeriod : false, 
    name : "Selectel", 
    difficulty : 20, 
    minutlyrevenue : 280, 
    city : "5fae62409cbf7d270f23470f", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b59", 
    status : "Available", 
    price : 3000000, 
    requiredStash : [
        "5fd7c635382e6600042582fe", 
        "5fd7c635382e6600042582f1", 
        "5fd7c635382e6600042582fc"
    ], 
    currentFirewall : 270, 
    maxFirewall : 270, 
    gracePeriod : false, 
    name : "Data Harbour", 
    difficulty : 40, 
    minutlyrevenue : 560, 
    city : "5fae62409cbf7d270f23470f", 
    __v : 0
},
{ 
    _id : "5fd7c67df260ed00042f3b57", 
    status : "Available", 
    price : 1500000, 
    requiredStash : [
        "5fd7c635382e6600042582f4", 
        "5fd7c635382e6600042582f4", 
        "5fd7c635382e6600042582fb"
    ], 
    currentFirewall : 150, 
    maxFirewall : 150, 
    gracePeriod : false, 
    name : "Rostelecom", 
    difficulty : 25, 
    minutlyrevenue : 390, 
    city : "5fae62409cbf7d270f23470f", 
    __v : 0
}

    ];
    return DataCenter.create(dataCenters);
  })
  .then((dataCentersCreated) => {
    console.log(
      `${dataCentersCreated.length} datacenters created with the following id:`,
    );
    console.log(dataCentersCreated.map((u) => u._id));
  })
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    mongoose.disconnect();
    console.error(err);
    process.exit(1);
  });
