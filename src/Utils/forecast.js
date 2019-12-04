const request = require('request')

const forecast = (lat,long,callback) => {
const url = ('https://api.darksky.net/forecast/6ccba4f28a5a07fdc4b0c2cc792269f0/' + encodeURIComponent(lat) + ','+ encodeURIComponent(long))
request({url,json:true },(error,{body}) => {
    if (error){
        callback('Unable to connect to weather services',undefined)
    
    } else if (body.error){
        callback('Unable to find location.Try another search',undefined)
    }else{
       console.log(body.daily.data[0])
        callback(undefined,
           body.daily.data[0].summary +' It is currently '+body.currently.temperature+
       ' degrees  with temprature high: '+ body.daily.data[0].temperatureHigh + 'degree and with temperatulre low: '+ 
       body.daily.data[0].temperatureLow + 'degree. There is a '+body.currently.precipProbability+'% chance of rain'
        )
    }
})
}

module.exports = forecast