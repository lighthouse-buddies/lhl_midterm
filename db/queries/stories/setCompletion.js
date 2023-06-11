const sequelize = require('../../sequelize');

async function setCompletion(story_id, completion){
  const story = await sequelize.Story.findByPk(story_id);
  if(!story){
    throw new Error(`Story with id ${story_id} not found`);
  }
  story.complete = completion;
  await story.save();
}

module.exports = setCompletion;
