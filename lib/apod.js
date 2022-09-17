import fetch from "node-fetch"
import child_process from 'child_process'
const {exec} = child_process
import fs from 'fs'
import request from 'request'

async function getLink() {
  const response = (await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=1999-11-01')).json()
  const link  = await response
  const page = link.url

  request(
    {method: 'GET', url: page, encoding: null},
    function (error, response, body){
        if(!error && response.statusCode === 200){
            fs.writeFileSync('a.png', body, 'binary')
            exec(`open a.png`)
        }
    }
  ) 
}
getLink()
