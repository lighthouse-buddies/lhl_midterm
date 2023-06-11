let liked = false;
let likes = 0;
const loadLikeCount = function() {
    $.get('/votes/chapter/count', function(response) {
      likes = response.count;
      // Assuming the response contains the updated number of votes
      // Update the button text
      $('#likes').text(likes + ' Likes');
    });
};

const checkVoteExists = function(chapterId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/votes/exists',
      type: 'GET',
      data: { chapter_id: chapterId},
      xhrFields: {
        withCredentials: true // Include session cookie
      },
      success: function(response) {
        //TODO: Update the button
        console.log(response);
        resolve(response);
      },
      error: function(error) {
        console.error('Error checking if vote exists:', error);
        reject(error);
      }
    });
  });
};


const createVote = function(chapterId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/votes',
      type: 'POST',
      data: { chapter_id: chapterId },
      xhrFields: {
        withCredentials: true // Include session cookie
      },
      success: function(response) {
        console.log(response);
        likes = parseInt(likes, 10) + 1;
        liked = true;
        $('#likes').text(likes + ' Likes');
        resolve(response);
      },
      error: function(error) {
        console.error('Error creating vote:', error);
        reject(error);
      }
    });
  });
};

const deleteVote = function(chapterId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/votes',
      type: 'DELETE',
      data: { chapter_id: chapterId },
      xhrFields: {
        withCredentials: true // Include session cookie
      },
      success: function(response) {
        console.log(response);
        likes -= 1;
        liked = false;
        $('#likes').text(likes + ' Likes');
        resolve(response);
      },
      error: function(error) {
        console.error('Error deleting vote:', error);
        reject(error);
      }
    });
  });
};

$(document).ready(function() {
  const urlParts = window.location.href.split('/');
  const chapterId = urlParts[urlParts.length - 1];

  console.log('ready');

  checkVoteExists(chapterId)
    .then((exists) => {
      liked = exists;
      console.log(liked);
    })
    .catch((error) => {
      console.error('Error checking vote existence:', error);
    });
  loadLikeCount()

  $('#likes').on('click', async function () {
    if (liked) {
      // DELETE VOTE
      await deleteVote(chapterId);
    } else {
      // CREATE VOTE
      await createVote(chapterId);
    }
  });
});
