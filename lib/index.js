const fs = require('fs')
const request = require('request');
const fetch = require('node-fetch-commonjs')
const c = require('ansi-colors')
const dayjs = require('dayjs')
const {prompt} = require('enquirer')
const {exec} = require('child_process')

async function run() {
  welcomeMessage()
  const answers = await inputBirthday()

  if (validDate(answers)) {
    const year = answers.split('-')[0]
    const url = year <= 1965 ? await fetchRandomLink() : await fetchLink(answers)
    displayPicture(url)
  } else {
    console.log(c.red('\n 👀 Invalid date \n'),c.yellow('Example: 2000-03-18'))
  }
}

function welcomeMessage() {
  console.log(c.cyan("\n Welcome to APOB !! 🎉 \n Let's take a look at the picture taken by NASA on your B-day !! 😆  \n "))
}

async function inputBirthday() {
  const question = [
    {
      type: 'input',
      name: 'birthday',
      message: 'When is your birthday ? 🎂',
      initial: '2000-01-01'
    }
  ]

  let answers = await prompt(question)
  return answers['birthday']
}

function validDate(response) {
  const date = dayjs(response).format("YYYY-MM-DD")
  if(date == response) {
    return true
  } else {
    return false
  }
}

async function fetchRandomLink() {
  const token = process.env.APOD_ACCESS_TOKEN || DEMO_KEY
  const response = (await fetch(`https://api.nasa.gov/planetary/apod?api_key=${token}&count=1`)).json()
  const link = await response
  return link[0]
}

async function fetchLink(date) {
  const token = process.env.APOD_ACCESS_TOKEN || DEMO_KEY
  const response = (await fetch(`https://api.nasa.gov/planetary/apod?api_key=${token}&date=${date}`)).json()
  const link  = await response
  return link
}

function displayPicture(link) {
  request(
    {method: 'GET', url: link.url, encoding: null},
    function (error, response, body){
        if(!error && response.statusCode === 200){
          console.log(c.green('\n Title:'), c.bgMagenta(link.title))

          const timeStamp = new Date().getTime()
          fs.writeFileSync(`./picture_data/${timeStamp}.png`, body, 'binary');

          exec(`open ./picture_data/${timeStamp}.png`)
        }
    }
  )
}

run()
