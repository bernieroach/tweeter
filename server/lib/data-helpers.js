"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

var ObjectID = require('mongodb').ObjectID;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet,callback)
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    updateTweet: function(id, incLike, likeFlag, incFlag, incRetweet, callback) {
      db.collection("tweets").updateOne( { "_id" : ObjectID(id) },
                                         { $inc : { "likes"  : incLike },
                                           $set : { "likeFlag" : likeFlag }
                                          },
                                          callback );
    }
  };
}
