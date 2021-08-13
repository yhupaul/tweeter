/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.err(err);
      }
    });
  };

  loadTweets();
  
  const renderTweets = function(tweets) {
    const $tweetContainer = $('.tweet-container');
    $tweetContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    }
  };
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const safeHTML =  `<p>${escape(tweet.user.name)}</p>`;
    const $tweet = $(` <article class="tweet">
      <div class="person">
        <div class="imgName">
          <img width="70px" height="70px" alt="profile img" src="${escape(tweet.user.avatars)}">
          <p>${escape(tweet.user.name)}</p>
        </div>          
        <p class="word">${escape(tweet.user.handle)}</p>
      </div>
      <div class="write">${escape(tweet.content.text)}</div>
      <div class="bottom">
        <p class="date" name="text">${escape(timeago().format(tweet.created_at))}</p>
        <div class="images">
          <p class="fas fa-flag"></p><p class="fas fa-retweet"></p><p class="fas fa-heart"></p>
        </p></div>
      </div>
    </article>`);
    return $tweet;
  };
  
  const $form = $('#tweets');
  $form.on('submit', function(event) {
    event.preventDefault();
    console.log('the form has submitted');
    const serializedData = $(this).serialize();
    console.log(serializedData);
    if (serializedData.slice(5).length > 0) {
      if (serializedData.slice(5).length > 140) {
        $('.too-long').slideDown();
        event.currentTarget['0'].value = "";
        $(".counter").text(140);
      } else {
        $.post('/tweets', serializedData).then(loadTweets);
        event.currentTarget['0'].value = "";
        $(".counter").text(140);
        $('.too-long').slideUp();
        $('.empty').slideUp();
      }
    } else {
      $('.empty').slideDown();
    }
  });
});

