// import fetch from "node-fetch"

const fs = require('fs')
const Form = require('enquirer')
const exec = require('child_process')
const request = require('request');
const { get } = require('request');
import('node-fetch').then(res => {
  console.log(res)
})

// const prompt = new Form({
//   name: 'user',
//   message: 'When is your birthday:',
//   choices: [
//     { name: 'AD', message: 'A.D', initial: '2000' },
//     { name: 'Month', message: 'Month', initial: '3' },
//     { name: 'Day', message: 'day', initial: '18' }
//   ]
// });

// prompt.run()
//   .then(value => console.log('Answer:', value))
//   .catch(console.error);

async function getLink() {
  const response = (await fetch('https://api.nasa.gov/planetary/apod?api_key=nHMWaVpFdyFYqUILQF2dUqMGXdz10drIioFtPX27&date=2020-02-12')).json()
  const link  = await response
  const page = link.url

  request(
    {method: 'GET', url: page, encoding: null},
    function (error, response, body){
        if(!error && response.statusCode === 200){
            fs.writeFileSync('a.png', body, 'binary');
            exec('open a.png')
        }
    }
);
}

getLink()

// (async ()=> {
//   const question = {
//     type: 'select',
//     name: 'favorite',
//     message: '好きな乗り物は？',
//     choices: ['パトカー', '救急車', '消防車'],
//   };
//   const answer = await Enquirer.prompt(question);
//   console.log(`僕も${answer.favorite}が好きだよ`);
// })();
