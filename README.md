# 🌎 apobirthday 🌎
Show the picture taken by NASA for the day you were born.

## Install
Install with [npm](https://www.npmjs.com/package/apobirthday)

```
$ npm install -g apobirthday
```

##  Set your API key

```
$ export APOD_ACCESS_TOKEN=YOUR_API_KEY
```

🔑 You need NASA API account to create API key. More info is [here](https://api.nasa.gov/).

You can use apod without API key.

In that case DEMO key is used automatically instead of API key.

This api has access limit.

### About access limit
#### When you use DEMO key
- Hourly Limit: 30 requests per IP address per hour
- Daily Limit: 50 requests per IP address per day

#### When you use API key
- Hourly Limit: 1,000 requests per hour

## Usage

![how_to_use](https://user-images.githubusercontent.com/81839214/192224899-c2ffdde5-8658-4fcb-b758-affe2edac455.gif)

### Result
<img width="587" alt="スクリーンショット 2022-09-26 17 16 35" src="https://user-images.githubusercontent.com/81839214/192227280-9c37d8aa-f4df-4bc0-90f1-7d78a4948bbd.png">

## Caution
🚨 Please note that there is no data before 1965,
in that case a random date is specified when data before June 16 1995 is entered.
