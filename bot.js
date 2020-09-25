
var request = require('request-promise');
/**
 * bot.js
 * 
 * This is where you define your chatbot! There are three
 * functions in this file that you'll want to customize:
 * `botName`, `introduce`, and `respond`.
 */

/**
 * @return The name of this bot
 */
botName = () => {
  return 'UofT Bot';
}


// Get a free key at https://weatherstack.com/dashboard
const WEATHER_STACK_API_KEY = '940fe6d94df926666ddd83d67b5f24ca';

getWeather = async (msg) => {
  let response = "I don't know"
  
  const city = msg.split(' in ')[1]
  const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_API_KEY}&query=${city}`

  const res = await request(weatherURL, {json: true})
  const weather = res.current.weather_descriptions[0]
  return weather;
}

const movies = {
  horror: ['hereditary', 'blair witch project'],
  comedy: ['rush hour']
}

getRandomItemInArray = (arr) => {
  var i = Math.floor(Math.random() * arr.length)
  return arr[i]
}

getRandomMovie = (genre) => {
  return getRandomItemInArray(movies[genre])
}

recommendMovie = (msg) => {
  const genres = Object.keys(movies)
  for (let genre of genres){
    if (msg.includes(genre)){
      return getRandomMovie(genre)
    }
  }
  return "I don't know that genre"
}

// key: value,
// key: value

const recipes = {
  pie: ['fruit', 'flour'],
  burger: ['bread', 'tomato', 'cheese']
}

//
recommendRecipes = (msg) => {
  var ingredient = msg.split(' ');
  var possibleRecipes = []

  Object.entries(recipes)
    .forEach(([key, value]) => {
      const isRecipePossible = value.every(i => ingredient.includes(i))

      if (isRecipePossible){
        possibleRecipes.push(key)
      }
    })

  // Case 1: We have something we can make
  // Case 2: We can make nothing
  if (possibleRecipes.length > 0){
    return "We can make " + possibleRecipes.join(', ')
  } else{
    return "We can't make anything"
  }
}

/**
 * Introduces the bot to someone or something
 * 
 * This will be the first thing the bot says! This is a
 * good place to suggest what kinds of things your bot
 * likes to talk about.
 * 
 * @return The bot's self-introduction
 */
introduce = () => {
    return "Hello there! My name is Betty. What's your name?";
}

/**
 * Responds to a message
 * 
 * This is the heart of your bot. This function receives
 * the last message that was sent in the conversation, and
 * uses that to determine what your bot should say in
 * reponse.
 * 
 * @param lastMessage The last thing that was said in the
 *                    conversation
 * @return The bot's response to the last message
 */
respond = (lastMessage) => {
	const lowerCaseMessage = lastMessage.toLowerCase();
	
	if (lowerCaseMessage.includes('my name is')) {
			return "Well, it's nice to meet you!";
	} else if (lowerCaseMessage.includes('movie')){
    return recommendMovie(lowerCaseMessage)
  } else if(lowerCaseMessage.includes('recipe')){
    return recommendRecipes(lowerCaseMessage)
  } else if(lowerCaseMessage.includes('weather')){
    return getWeather(lowerCaseMessage)
  }
  else {
		return "I am not sure what you mean!"
	}
}



/**
 * This is what lets other files (like `index.js`) access
 * the functions in this file. You shouldn't mess with this
 * code unless you know what you're doing.
 */
module.exports = {
    botName,
    introduce,
    respond
};