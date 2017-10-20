// Tweeter W3 LHL project
// Author Bernard Roach
// date Oct 19, 2017
// Tweeter clone webpage to practice CSS styling, AJAX calls, and MongoDB
// DOM loaded, update with tweets

"use strict";

// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

// mongo db
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// sass
const sassMiddleware = require('node-sass-middleware')

// has to be called be express.static call
app.use(sassMiddleware({
  src: './scss', // Location of SASS files
  dest: './public/scss', // Compiled CSS location
  prefix:  '/scss'       // URL path to be intercepted by the middleware and
}))                     // compiled on the fly. When the browser tries to
                        // GET /css/main.css, it compiles ./stylesheets/main.scss

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// connect to the Tweeter DB
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);
  app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
  });
});

