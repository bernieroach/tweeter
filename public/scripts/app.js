// Tweeter W3 LHL project
// Author Bernard Roach
// date Oct 19, 2017
// Tweeter clone webpage to practice CSS styling, AJAX calls, and MongoDB
// DOM loaded, update with tweets


// load this stuff after the DOM is ready/loaded
$(document).ready(function(){


const maxTweetChars = 140;

// create a Tweet Element
const createTweetElement = (tweet) => {
  let $article = "";
  let $header = "";
  let $hdTable = "";
  let $rowTable = "";
  let $colTable = "";
  let $img = "";
  let $body = "";
  let $footer = "";
  let $button = "";

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
    $article.data("handle", tweet.user.handle);
    $article.data("created", tweet.created_at);

// build the footer
    $footer = $("<footer>");
    $hdTable = $("<table>").attr("width","100%");
    $rowTable = $("<tr>");
    $colTable = $("<td>");
    $colTable.append($("<p>").text(`${timeSince(tweet.created_at)} / ${tweet.likes} likes` ));
    $rowTable.append($colTable);
    $colTable = $("<td>").attr("align","right");
    $img = $("<img>").addClass("footimg").addClass("flag").attr("src","http://simpleicon.com/wp-content/uploads/flag.png");
    $colTable.append($img);
    $img = $("<img>").addClass("footimg").addClass("retweet").attr("src","https://d30y9cdsu7xlg0.cloudfront.net/png/45568-200.png");
    $colTable.append($img);
    $img = $("<img>").addClass("footimg").addClass("like").data("liked",false)  .attr("src","https://d30y9cdsu7xlg0.cloudfront.net/png/1308-200.png");
    $img.data("id",tweet._id);

    $colTable.append($img);
    $rowTable.append($colTable);
    $hdTable.append($rowTable);
    $footer.append($hdTable);
    $article.append($footer);

  };
// return the article sub DOM
  return $article;
};

// build the tweet article list and add it to the DOM
const renderTweets = (tweets) =>{


// refresh the tweet list on the screen
    $("article").remove();
// go through the list of tweets, create a tweet and append to the list
    tweets.forEach((tweet) =>{
    $('#tweet-feed').prepend(createTweetElement(tweet));
      });

};

// ajax call to GET the tweets
const loadTweets = () =>{

      $.ajax({
      url: 'tweets',
      method: 'GET',
      success: function (tweets) {
          renderTweets(tweets);
        }
      });

};


// ajax call to POST the new tweet
$(".new-tweet input").on("click", function(event){
  // prevent the button from sending POST
  event.preventDefault();
  // need to pass context to the callback, save and use.
  const inputThis = this;
  // emptiness check
  if($(this).siblings("textarea").val().length){
     // max character check
     if(parseInt($(this).siblings(".counter").text()) >= 0 ){
     $.ajax({
       url: '/tweets',
       data: $(this).parent().serialize(),
       method: 'POST',
       success: function (succ) {
         console.log('Success: ', succ);
          loadTweets();
          $(inputThis).siblings("textarea").val("");
          }
        });
     } else {
      alert(`tweets can only be ${maxTweetChars} long`);
     }
  } else {
    alert("please enter something for your tweet");
  }

});

$("#tweet-feed").on("click", ".like" , function(event){

  console.log("like");
  // determine
      $.ajax({
        url: `/tweets/${$(this).data("id")}`,
        data: "like=true",
        method: 'POST',
        success: function (succ) {

        loadTweets();
        }
      });
}) ;

$("#tweet-feed").on("click", ".flag" , function(event){

  console.log("flag");
});

$("#tweet-feed").on("click", ".retweet" , function(event){

  console.log("retweet");
});

// load the Tweets!
loadTweets();

});