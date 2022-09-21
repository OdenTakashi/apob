const fs = require('fs')
const request = require('request');
const fetch = require('node-fetch-commonjs')
const {Form} = require('enquirer')
const {exec} = require('child_process')

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

async function getLink(date) {
  const response = (await fetch(`https://api.nasa.gov/planetary/apod?api_key=nHMWaVpFdyFYqUILQF2dUqMGXdz10drIioFtPX27&date=${date}`)).json()
  const link  = await response
  const title = link.title
  const page = link.url

  request(
    {method: 'GET', url: page, encoding: null},
    function (error, response, body){
        if(!error && response.statusCode === 200){
          console.log('Title:', title)
          const timeStamp = new Date().getTime()
          fs.writeFileSync(`./picture_data/${timeStamp}`, body, 'binary');
          exec('open a.png')
        }
    }
);
}
