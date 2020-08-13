'use strict'

// get the dotENV
require('dotenv').config()

// get the PORT
const PORT = process.env.PORT

// launching express
const express = require('express')
const app = express()

// setup cors
const cors = require('cors')
app.use(cors())

// creating our first ROUTE AKA Homepage
app.get('/', (req, res) => {
    res.status(200).send('okay')
})

app.get('/location', (req, res) => {
    const locationData = require('./data/geo.json')
    const location = new Location(locationData)
    res.status(200).json(location)
})

let weatherArray = []

app.get('/weather', (req, res) => {
    let weatherData = require('./data/darksky.json')
    let dataArray = weatherData.daily.data
    dataArray.forEach((val) => {
        let time = new Date(val.time * 1000).toDateString()
        let summary = val.summary
        new Weather(summary, time)
    })
    res.status(200).send(weatherArray)
})
function Weather(forecast, time) {
    this.forecast = forecast
    this.time = time
    weatherArray.push(this)
}
function Location(data) {
    this.formatted_query = data.results[0].formatted_address
    this.latitude = data.results[0].geometry.location.lat
    this.longitude = data.results[0].geometry.location.lng
    this.search_query = 'Lynnwood'
}
// Listening to PORT
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

