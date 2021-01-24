const mongoose = require('mongoose');

const { Schema } = mongoose;
// https://www.infoworld.com/article/2631698/true-believers--the-biggest-cults-in-tech.html?page=4
const devotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Way Of The Future', 'Brotherhood Of The Ruby', 'The Ubuntu Tribe', 'The Order of the Lisp', 'The Tao of Newton'],
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

/*
inflicts more damage on certain people
more money from datacenters
more stash from crimes
extra defense
battery sale on on vpn change
battery sale on crimes
maxhp on crimes are lower
skill gain
hides online status
Higher sales price for stash
schizofreni. make money while afk
other thoughts: disposable weapons and potions?
*/

module.exports = mongoose.model('Devotion', devotionSchema);
