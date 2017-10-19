$(document).ready(function(){

const maxTweetChars = 140;

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
  event.preventDefault();
  const inputThis = this;
  if($(this).siblings("textarea").val().length){
     if(parseInt($(this).siblings(".counter").text()) >= 0 ){
     $.ajax({
       url: '/tweets',
       data: $(this).parent().serialize(),
       method: 'POST',
       success: function (succ) {
         console.log('Success: ', succ);
          loadTweets('update');
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

 $(".toggle").on("click", function(event){
  if($(this).attr("show") === "true"){

    $("#tweet-box").addClass("hide");
    $("#tweet-box").removeClass("show")
    $(this).attr("show","false");
  } else {

    $("#tweet-box").removeClass("hide");
    $("#tweet-box").addClass("show")
    $(this).attr("show","true");

  }
 });

});


