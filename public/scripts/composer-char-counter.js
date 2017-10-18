$(document).ready(function(){

var maxTweetChars = 140;

// on textarea input countdown/up the char length available in the counter
  $(".new-tweet textarea").on("input",function(event){
    const tweetCharsRemaining = (maxTweetChars - $(this).val().length);
    $(this).siblings(".counter").text(tweetCharsRemaining.toString());
    if(tweetCharsRemaining < 0){
      $(this).siblings(".counter").addClass("negNumber");
      $(this).siblings(".counter").removeClass("posNumber")
    } else {
      $(this).siblings(".counter").removeClass("negNumber");
      $(this).siblings(".counter").addClass("posNumber");
    }
  });
// prevent the button from sending POST
 $("input").on("click", function(event){
  debugger;
  event.preventDefault();
  console.log($(this).parent().serialize());

 //  var $tweeterFeed = $('#tweets-container');
 //    $.ajax({
 //      url: 'more-posts.html',
 //      method: 'GET',
 //      success: function (morePostsHtml) {
 //        console.log('Success: ', morePostsHtml);

 // }});
});
});


