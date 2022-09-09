import fetch from "node-fetch"

async function getHtml() {
  const response = (await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=1999-11-05')).json()
  const link  = await response
  const page = link.url
  console.log(page)
}
getHtml()

