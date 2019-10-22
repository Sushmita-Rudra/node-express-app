// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security

// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way



app.get('/', function (req, res) {
    res.send('Welcome to my Module 4 assignment  on creating Express App<br> ' +

    'This reponse is triggered when the use enters "/" in the URL <br>' +
  ' Here are few links which were helpful to me while build this app'+
  '<ul>' +
    '<li>' +
      '<a href = "https://expressjs.com/en/starter/generator.html">Starter pack</a>' +
    '</li>'+
  '</ul>'

    )
  })
 


// or use the new arrow function syntax
// respond with text
app.get('/hello', (req, res) => {
  res.send('hello Maryville!')
})

// or respond with html
app.get('/big', (req, res) => {
  res.send('<h1>HELLO WORLD!</h1>')
})

// or respond with JSON
app.get('/json', (req, res) => {
  res.send('{"name" : "Rudra Sushmita"}')
})

// :name indicates a parameter at this location in the URI
app.get('/greeting/:id', (req, res) => {
  res.send(`Hey! The id provided was ${req.params.id}.`)
})

// combine your skills and get creative
app.get('/yo/:buddy', (req, res) => {
  res.send(`<h1>Yo what's up !, ${req.params.buddy}!</h1>`)
})
/**
 // provide multiple query parameters (named first and last) with ? and &
app.get('/fancy', (req, res) => {
  const first = req.query.first
  const last = req.query.last
  res.send(`Hello ${first} ${last}!`)
})

let fortunes = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes - definitely.',
'You may rely on it', 'As I see it, yes.', 'Most likely', 'Outlook good.', 'Yes.', 'Signs point to yes.',
'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 
'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.',
'Very doubtful.']

// Implements a Magic 8 Ball service
app.get('/joke', (req,res) => {
  if(isEmpty(req.query)){
    res.send('<h2>You wish to know the future?</h2>' +
             '<p>Ask a question in the query string, e.g., http://localhost:3002/fortune?Will I become rich? <br/>' +
             '<p>The Magic 8 Ball will answer!</p>')
  } else {
    res.send(`The answer is ... wait for it ... ${fortunes[randomInt(0, fortunes.length)]}`)
  }
})
*/
app.get('/fancy', (req, res) => {
  const first = req.query.first
  const last = req.query.last
  res.send(`Hello ${first} ${last}!`)
})

let jokes = ['Chuck Norris sheds his skin twice a year.', 'Chuck Norris doesnt shower, he only takes blood baths.', 'Chuck Norris has two speeds: Walk and Kill.', 'When Chuck Norris talks, everybody listens. And dies.',
'Chuck Norris doesnt wash his clothes. He disembowels them.', 'Chuck Norris can win a game of Connect Four in only three move', 'Chuck Norris can divide by zero.', 'Chuck Norris always knows the EXACT location of Carmen SanDiego..', 'Chuck Norris has 12 moons. One of those moons is the Earth.', 'It takes Chuck Norris 20 minutes to watch 60 Minutes.',
]

// Implements a Joke master service
app.get('/joke', (req,res) => {
  if(isEmpty(req.query)){
    res.send('<h2>You wish to hear a joke?</h2>' +
             '<p>Ask a question in the query string, e.g., http://localhost:3002/joke?Can I hear the lamest joke ever? <br/>' +
             '<p>The Joke master will answer!</p>')
  } else {
    res.send(`The joke is ...  ${jokes[randomInt(0, jokes.length)]}`)
  }
})


// Use middleware to handle all non-managed routes (e.g. /xyz)
// https://expressjs.com/en/api.html#req.originalUrl
app.use((req, res, next) => {
  res.status(404).send(`status 404 - ${req.originalUrl} was not found`);
})

// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /hello`)
  console.log(`   Try /big`)
  console.log(`   Try /json`)
  console.log(`   Try /joke`)
  console.log(`   Try /greeting/yourname`)
  console.log(`   Try /yo/Dr.Rogers`)
  console.log(`   Try /fancy/?first=Sushmita&last=Rudra`)
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})

// Utility to see if an object is empty or not

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// generates a random value in [low,high) 
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}