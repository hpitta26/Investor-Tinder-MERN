require('dotenv').config() //adding a module similar to import statement

const express = require('express')
const app = express()
app.use(express.json()) //middleware function in Express.js -> parses incoming JSON requests and puts data in "req.body"

const cors = require('cors')
app.use(cors({ //specifies what origins can send access your API resources
    origin: 'http://localhost:3000'
    // origin: ['', '', ''] -> only certain origins can access the API
    // origin: '*' -> public API
}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
//these print statements will help us debug if anything goes wrong with the db connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//localhost:9000/startups
const startupsRouter =  require('./routes/startups')
app.use('/startups', startupsRouter) //uses startupsRouter whenever the request Route is localhost:9000/startups

//localhost:9000/watchlist
const watchlistRouter =  require('./routes/watchlist')
app.use('/watchlist', watchlistRouter)

//localhost:9000/portfolio
const portfolioRouter =  require('./routes/portfolio')
app.use('/portfolio', portfolioRouter)

app.listen(9000, () => console.log('Server Started'))



