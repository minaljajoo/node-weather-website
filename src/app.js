
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')


console.log(path.join(__dirname,'../public'))
const app = express()

//Define path for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engin and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Minal Jajoo'

    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'About Me',
        name:'Minal Jajoo'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'This is the Help page',
        name:'Minal Jajoo',
        title:'Help'
    })
})

app.get('/weather',(req,res)=>{
    
    if (!req.query.address){
        return  res.send({
              error:'you must provide a address'
          })
  
      }

      geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
      
        forecast(latitude,longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData ,
                  location,
                  address: req.query.address
            })
           
          })
    })
    // res.send([{
    //     forecast: '46 degree',
    //     location: 'orlando',
    //     address: req.query.address
    // }])
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
    msg:'Help article not found',
    title: '404 Help page',
    name: 'Minal Jajoo'
})
})

app.get('*',(req,res)=>{
    res.render('error',{
        msg:'Page not found',
        title: '404  page',
        name: 'Minal Jajoo'
    })
})

app.listen (3000,()=>{
console.log('server is up on port 3000')
})

