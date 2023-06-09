

let liked = false;
$(document).ready(function() {
  console.log('ready');
  $('#likes').on('click', function() {
    $.post('/votes', function(success) {
      console.log(success);
      if (success) {
        $.get('/votes/chapter/count', function(response) {
          const voteDetails = response;
          // Assuming the response contains the updated number of votes
          // Update the button text
          $('#likes').text(voteDetails.count + ' Likes');
        });
      }
    });
  });
});

