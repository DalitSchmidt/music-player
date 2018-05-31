const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use( ( req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/albums', require('./routes/albums'))
app.use('/api/genres', require('./routes/genres'))
app.use('/api/youtube', require('./routes/youtube'))

app.use(( req, res, next ) => {
    const err = new Error('Not Found')
    err.status = 404
})

app.use(( err, req, res, next ) => {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: ( app.get('env') === 'development' ) ? err : {},
    })
})

module.exports = app