const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//define paths for express config
const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir));


app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Viktor'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About page',
        name: 'Viktor'
    })
});

app.get('/help', (req, res) => {
    res.render('help',{
        helpMessage: 'This is help page',
        title:'Help page',
        name: 'Viktor'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({Error: error})
        }
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                res.send({Error: error})
            }
            res.send({
                location: data.city,
                forecast: forecastData
            })
        })
    })
});

app.get('/products',(req,res) => {
    if(!req.query.search){
      return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:"Help Page not found",
        title:'Error page',
        name: 'Viktor'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:"Page not found",
        title:'Error page',
        name: 'Viktor'
    })
})


app.listen(3000, () =>{
    console.log('server started on port 3000')
});