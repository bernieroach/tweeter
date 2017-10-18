/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function calculateSince(datetime)
{
  var tTime=new Date(datetime);
  var cTime=new Date();
  var sinceMin=Math.round((cTime-tTime)/60000);
  if(sinceMin==0)
  {
      var sinceSec=Math.round((cTime-tTime)/1000);
      if(sinceSec<10)
        var since='less than 10 seconds ago';
      else if(sinceSec<20)
        var since='less than 20 seconds ago';
      else
        var since='half a minute ago';
  }
  else if(sinceMin==1)
  {
      var sinceSec=Math.round((cTime-tTime)/1000);
      if(sinceSec==30)
        var since='half a minute ago';
      else if(sinceSec<60)
        var since='less than a minute ago';
      else
        var since='1 minute ago';
  }
  else if(sinceMin<45)
      var since=sinceMin+' minutes ago';
  else if(sinceMin>44&&sinceMin<60)
      var since='about 1 hour ago';
  else if(sinceMin<1440){
      var sinceHr=Math.round(sinceMin/60);
  if(sinceHr==1)
    var since='about 1 hour ago';
  else
    var since='about '+sinceHr+' hours ago';
  }
  else if(sinceMin>1439&&sinceMin<2880)
      var since='1 day ago';
  else
  {
      var sinceDay=Math.round(sinceMin/1440);
      var since=sinceDay+' days ago';
  }
  return since;
};


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};


// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "<script>alert('uh oh!');</script>"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

const createTweetElement = (tweet) => {
  let $article = "";
  let $header = "";
  let $hdTable = "";
  let $rowTable = "";
  let $colTable = "";
  let $img = "";
  let $body = "";
  let $footer = "";
  if(tweet){

// build the header

// handle table container
    $article = $("<article>").addClass("tweet");
    $header =  $("<header>").addClass("tweetheader");
    $hdTable = $("<table>").addClass("handle");
    $rowTable = $("<tr>");
    $colTable = $("<td>").addClass("handle");
    $colTable.append($("<p>").addClass("handle tweeterer").text(tweet.user.handle));
    $rowTable.append($colTable);
    $hdTable.append($rowTable);
    $header.append($hdTable);

// build the avatar container
    $hdTable = $("<table>");
    $rowTable = $("<tr>");
    $colTable = $("<td>").addClass("avatar");
    $img = $("<img>").addClass("avatar tweetterer").attr("src",tweet.user.avatars.small);
    $colTable.append($img);
    $rowTable.append($colTable);

    $colTable = $("<td>");
    $colTable.append($("<h2>").addClass("tweeterer").text(tweet.user.name));
    $rowTable.append($colTable);
    $hdTable.append($rowTable);
    $header.append($hdTable);
    $article.append($header);

// build the tweet
    $article.append($("<p>").text(tweet.content.text));

// build the footer
    $footer = $("<footer>");
    $hdTable = $("<table>").attr("width","100%");
    $rowTable = $("<tr>");
    $colTable = $("<td>");
    $colTable.append($("<p>").text(calculateSince(tweet.created_at)));
    $rowTable.append($colTable);
    $colTable = $("<td>").attr("align","right");
    $img = $("<img>").addClass("footimg").attr("src","http://simpleicon.com/wp-content/uploads/flag.png");
    $colTable.append($img);
    $img = $("<img>").addClass("footimg").attr("src","https://d30y9cdsu7xlg0.cloudfront.net/png/45568-200.png");
    $colTable.append($img);
    $img = $("<img>").addClass("footimg").attr("src","https://d30y9cdsu7xlg0.cloudfront.net/png/1308-200.png");
    $colTable.append($img);
    $rowTable.append($colTable);
    $hdTable.append($rowTable);
    $footer.append($hdTable);
    $article.append($footer);



  };
  return $article;
};

const renderTweets = (tweets) =>{
  tweets.forEach((tweet) =>{
    $('#tweets-container').append(createTweetElement(tweet));
  });
};


$(()=>{
  console.log("dom load");

renderTweets(data);
// var $tweet = createTweetElement(tweetData);
// console.log($tweet);
// $('#tweets-container').append($tweet);

});