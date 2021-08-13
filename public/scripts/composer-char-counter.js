$(document).ready(function() {
  $('#tweet-text').on("input", function(e) {
    const content = $(this).val();
    const counter = $(this).parent().find(".counter");
    counter.html(140 - content.length);
    if (content.length > 140) {
      counter.css('color','red');
    } else {
      counter.css('color', 'black');
    }
  });
});