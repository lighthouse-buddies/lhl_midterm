function createStoryPreviewElement(story, firstChapter) {
  const article = document.createElement('article');
  article.classList.add('story-preview');

  const header = document.createElement('header');
  header.classList.add('story-title');

  const link = document.createElement('a');
  link.href = `/chapters/${story.firstChapter.id}`;
  link.textContent = story.story.title;

  header.appendChild(link);
  article.appendChild(header);

  const paragraph = document.createElement('p');
  // paragraph.textContent = 'This is the story content, the first line will be typed here to get the reader hooked. Until a certain limit is reached the story will show...';
  const first25Words = story.firstChapter.content.split(" ").slice(0, 25).join(" ");
  paragraph.textContent = first25Words + "...";

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
    url: '/chapters/:id/json',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      // Parse the response into an object
      const data = {
        currentChapter: response.currentChapter,
        nextChapters: response.nextChapters,
        nextApproved: response.nextApproved
      };


      // Get the scroll container element
      const scroll = $('.story-scroll');

      // Loop through each story and create the story preview element



    },
    error: function(error) {
      // Handle any errors that occur during the AJAX request
      console.error('Error fetching recent stories:', error);
    }
  });
});
