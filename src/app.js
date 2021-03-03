const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(path.join(__dirname, '../api/users.json'))


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Manuel Bermejo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Manuel Bermejo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Manuel Bermejo'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Provide address'
        })
    }

    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { forecast }) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast,
                address

            })

        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })

    console.log(req.query.search)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manuel Bermejo',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manuel Bermejo',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server has started on port ' + port)
})