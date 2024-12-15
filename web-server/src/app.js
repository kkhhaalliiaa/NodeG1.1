const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forcast= require('./utils/forcast')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hbs engine and veiws location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup stactic directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.static('public'));


app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Khalia Howard',
        helpText:'Need Help?'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Khalia Howard'
    })
}) 

app.get('/', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Khalia Howard'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    const unit = req.query.unit || 'f';

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
    
        
        const unit = req.query.unit || 'f'; 
    
        forcast(latitude, longitude, unit, (error, data) => {
            if (error) {
                return res.send({error});
            }
    

            res.send({
                forecast: data,
                location: location,
                address: req.query.address,
                unit: unit
            });
        });
    });
})


app.get('/products',(req, res) =>{
    if (!req.query.search){
        return res.send({
        error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title: '404',
        name:'Khalia Howard',
        errorMessage :'Help article not found'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Khalia Howard',
        errorMessage:'Page not found' 
    })
})


app.listen(3000, ()=>{
    console.log('server is up on port 3000.')
})