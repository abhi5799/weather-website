const request = require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWJoaXJhbTEiLCJhIjoiY2twNTN6NGUwMmN5ZjJ5bWNnMnRmcjBhaCJ9.z0Quy1XQiv1c7blU_M0MhQ&limit=1'
    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect to mapbox api',undefined)
        }
        else if(response.body.features[0]===undefined)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode