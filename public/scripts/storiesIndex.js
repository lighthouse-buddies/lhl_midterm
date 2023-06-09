function createStoryPreviewElement(story) {
    const article = document.createElement('article');
    article.classList.add('story-preview');

    const header = document.createElement('header');
    header.classList.add('story-title');

    const link = document.createElement('a');
    link.href = '';
    link.textContent = story.title;

    header.appendChild(link);
    article.appendChild(header);

    const paragraph = document.createElement('p');
    paragraph.textContent = 'This is the story content, the first line will be typed here to get the reader hooked. Until a certain limit is reached the story will show...';

    article.appendChild(paragraph);

    const footer = document.createElement('footer');

    const button = document.createElement('button');
    button.classList.add('story-status');
    button.textContent = 'In Progress';

    footer.appendChild(button);

    const h4 = document.createElement('h4');
    h4.classList.add('user-handle-red');
    h4.textContent = '@' + story.firstChapter.username;

    footer.appendChild(h4);
    article.appendChild(footer);

    return article;
  }


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
