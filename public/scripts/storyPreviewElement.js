/**
 * Creates a story preview HTML element based on the provided story object.
 * @param {Object} story - The story object containing information about the story and its first chapter.
 * const story = {
 *   story: {
 *     title: "Story Title",
 *     complete: true // or false
 *   },
 *   firstChapter: {
 *     id: 123,
 *     content: "This is the story content...",
 *     username: "userhandle"
 *   }
 * };
 *
 * // Example usage
 * const storyPreviewElement = createStoryPreviewElement(story);
 * @returns {HTMLElement} - The created article element representing the story preview.
 */
function createStoryPreviewElement(story) {
  // Create the article element
  const article = document.createElement('article');
  article.classList.add('story-preview');

  // Create the header element
  const header = document.createElement('header');
  header.classList.add('story-title');

  // Create the link element
  const link = document.createElement('a');
  link.href = `/chapters/${story.firstChapter.id}`;
  link.textContent = story.story.title;

  // Append the link to the header
  header.appendChild(link);
  // Append the header to the article
  article.appendChild(header);

  // Create the paragraph element
  const paragraph = document.createElement('p');
  // Get the first 25 words of the content from the first chapter
  const first25Words = story.firstChapter.content.split(" ").slice(0, 25).join(" ");
  paragraph.textContent = first25Words + "...";

  // Append the paragraph to the article
  article.appendChild(paragraph);

  // Create the footer element
  const footer = document.createElement('footer');

  // Create the button element
  const button = document.createElement('button');
  button.classList.add('story-status');
  // Set the button text based on the story completion status
  const status = story.story.complete ? 'Completed' : 'In Progress';
  button.textContent = status;

  // Append the button to the footer
  footer.appendChild(button);

  // Create the h4 element
  const h4 = document.createElement('h4');
  h4.classList.add('user-handle-red');
  h4.textContent = '@' + story.firstChapter.username;

  // Append the h4 to the footer
  footer.appendChild(h4);
  // Append the footer to the article
  article.appendChild(footer);

  // Return the created article element
  return article;
}
