const path=require('path')
const express = require('express')
const hbs = require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000

//Define path for express config
const publicpath=path.join(__dirname, '../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//Setup handlebar engine
app.set('view engine','hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

//Setup static directory
app.use(express.static(publicpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Abhishek Ramesh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Abhishek Ramesh"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Abhishek Ramesh',
        helptext:'This is the help page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>
        {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Abhishek',
        errormsg:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})