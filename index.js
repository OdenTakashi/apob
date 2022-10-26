#!/usr/bin/env node

const fs = require('fs')
const request = require('request');
const fetch = require('node-fetch-commonjs')
const c = require('ansi-colors')
const dayjs = require('dayjs')
const minimist = require('minimist')(process.argv.slice(2))
const {prompt} = require('enquirer')
const {execSync} = require('child_process')

const token = process.env.APOD_ACCESS_TOKEN || 'DEMO_KEY'

async function run() {
  welcomeMessage()
  const answers = await inputBirthday()

  if (validDate(answers)) {
    const inputDate = dayjs(answers)
    const startDate = dayjs('1995-06-16')
    const url = inputDate < startDate ? await fetchLink() : await fetchLink(specified=`date=${answers}`, ary=false)
    displayPicture(url)
  } else {
    console.log(c.red('\n 👀 Invalid date \n'),c.yellow('Example: 2000-03-18'))
  }
}

function welcomeMessage() {
  console.log(c.yellow("\n Welcome to APOB !! 🎉 \n Let's take a look at the picture taken by NASA on your B-day !! 😆  \n "))
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

  const answers = await prompt(question)
  return answers.birthday
}

function validDate(response) {
  const date = dayjs(response).format("YYYY-MM-DD")
  return date === response
}

async function fetchLink(specified='count=1', ary=true) {
  const response = (await fetch(`https://api.nasa.gov/planetary/apod?api_key=${token}&${specified}`)).json()
  const link = await response
  return ary ? link[0] : link
}

function displayPicture(link) {
  request(
    {method: 'GET', url: link.url, encoding: null},
    function (error, response, body){
      if(!error && response.statusCode === 200){
        console.log(c.yellow('\n 📚 Title:'), c.green(link.title))

        if (!fs.existsSync('./picture_data')) {execSync(`mkdir ./picture_data`)}

        const timeStamp = new Date().getTime()
        fs.writeFileSync(`./picture_data/${timeStamp}.png`, body, 'binary')
        execSync(`open ./picture_data/${timeStamp}.png`)
      }
    }
  )
}

function deletePicture() {
  const pictures = fs.readdirSync('./picture_data')
  if (pictures.length > 0) {
    execSync('rm ./picture_data/*.png')
    console.log(' \n Delete completed 😆')
  } else {
    console.log(' \n No files to delete 💦')
  }
}

function showPictures() {
  const pictures = fs.readdirSync('./picture_data')
  pictures.length > 0 ? console.log(pictures) : console.log(' \n No files to show 💦')
}

if (minimist.d) {
  deletePicture()
} else if (minimist.l){
  showPictures()
} else {
  run()
}
