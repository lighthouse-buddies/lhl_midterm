

$(document).ready(function() {
  // Fetch recent stories
  $.ajax({
    url: '/stories/recent/json',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      // Parse the response into an object
      const recentStories = response.storyData;

      // Create an array to hold all stories (completed first, then in progress)
      const allStories = [...recentStories.completed, ...recentStories.inProgress];

      // Get the container element
      const container = $('.story-preview-container');

      // Loop through each story and create the story preview element
      allStories.forEach(function(story) {
        const storyPreviewElement = createStoryPreviewElement(story);
        container.append(storyPreviewElement);
      });
    },
    error: function(error) {
      // Handle any errors that occur during the AJAX request
      console.error('Error fetching recent stories:', error);
    }
  });
});
