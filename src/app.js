const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const PORT = process.env.PORT || 3000

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Handlebars set up and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to send
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Badr Yahya'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us.',
        name: 'Badr Yahya'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        message : 'Nothing to see here folks.',
        name : 'Badr Yahya'
    });
});

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'no address provided'
        });
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            }) ;
        } forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            res.send({
                forecast : data,
                location,
                addressProvided : req.query.address
            });
        });
    });
});

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error : 'no search term'
        })
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('errorpage', {
        errorMessage : 'Help article not found',
        name : 'Badr Yahya'
    });
});

app.get('*', (req, res) => {
    res.render('errorpage', {
        errorMessage : 'PAGE NOT FOUND. (Could not find directory information)',
        name : 'Badr Yahya'
    });
});

app.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`)
});