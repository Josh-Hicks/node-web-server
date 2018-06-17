const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
hbs.registerPartials(__dirname + '/views/partials')

app.set('view enging', 'hbs')

// routes
app.get('/', (req, res, next) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello there!',
    })
})

app.get('/about', (req, res, next) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})