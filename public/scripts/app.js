// Client facing scripts here

const res = require("express/lib/response");

$(document).ready(function() {
  $('#likes').on('click', function() {
    $.post('/votes', function(success) {
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

