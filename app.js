const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/albums', require('./routes/albums'))
app.use('/api/genres', require('./routes/genres'))

app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {},
    })
})

module.exports = app