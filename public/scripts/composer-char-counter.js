// Tweeter W3 LHL project
// Author Bernard Roach
// date Oct 19, 2017
// Tweeter clone webpage to practice CSS styling, AJAX calls, and MongoDB
// DOM loaded, update with tweets

$(document).ready(function(){

const maxTweetChars = 140;

// on textarea input countdown/up the char length available in the counter
  $(".new-tweet textarea").on("input",function(event){
    const tweetCharsRemaining = (maxTweetChars - $(this).val().length);
    $(this).siblings(".counter").text(tweetCharsRemaining.toString());
// change CSS based on class change
    if(tweetCharsRemaining < 0){
      $(this).siblings(".counter").addClass("negNumber");
      $(this).siblings(".counter").removeClass("posNumber")
    } else {
      $(this).siblings(".counter").removeClass("negNumber");
      $(this).siblings(".counter").addClass("posNumber");
    }
  });
// neat function to nicely toggle stuff in/out of view
  $(".toggle").on("click", function(event){
  $("#tweet-box").slideToggle();
  $("textarea").select();

 });

});


