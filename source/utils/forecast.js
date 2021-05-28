const request = require('request')

const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=44dceaf7df755ed2c4d8314c00806374&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)
    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to weather api',undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            callback(undefined,'The temperature today is : '+response.body.current.temperature+' but it feels like : '+response.body.current.feelslike+'. It is '+response.body.current.weather_descriptions[0]+' today.')
        }
    })
}

module.exports=forecast