"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err,db)=>{

if(err){
  console.error(`Failed to connect to: ${MONGODB_URI}`);
  throw err;
}
  console.log(`Connected to mongodb: ${MONGODB_URI}`);


  db.collection("tweets").find().toArray((err,result)=>{
    if(err) throw err;
    console.log("result direct toArray", result);
  })
  db.close();
})