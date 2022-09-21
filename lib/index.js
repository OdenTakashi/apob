const fs = require('fs')
const request = require('request');
const fetch = require('node-fetch-commonjs')
const c = require('ansi-colors')
const {Form} = require('enquirer')
const {exec} = require('child_process')

function exec() {
  welcomeMessage()
}

function welcomeMessage() {
  console.log(c.green("Welcome to APOB!! 🎉🎉 \n Let's take a look at the photo taken by NASA on your B-day!!😆🦄 "))
}

function inputBirthday() {
  const prompt = new Form({
    name: 'user',
    message: 'When is your birthday ? :',
    choices: [
      { name: 'AD', message: 'A.D', initial: '2000' },
      { name: 'Month', message: 'Month', initial: '03' },
      { name: 'Day', message: 'day', initial: '01' }
    ]
  });
  
  prompt.run()
    .then(value => getLink((Object.values(value)).join('-')))
    .catch(console.error);
}

function displayPicture(link) {
  request(
    {method: 'GET', url: link.url, encoding: null},
    function (error, response, body){
        if(!error && response.statusCode === 200){
          console.log('Title:', link.title)
          const timeStamp = new Date().getTime()
          fs.writeFileSync(`./picture_data/${timeStamp}`, body, 'binary');
          exec('open a.png')
        }
    }
  )
}

async function fetchLink(date) {
  const response = (await fetch(`https://api.nasa.gov/planetary/apod?api_key=nHMWaVpFdyFYqUILQF2dUqMGXdz10drIioFtPX27&date=${date}`)).json()
  const link  = await response
  return link
}
