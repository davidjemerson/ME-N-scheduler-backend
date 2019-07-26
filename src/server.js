import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import db from './db'
const MongoStore = require('connect-mongo')(session)
import passport from './passport'
import routes from './routes'
import schedule from 'node-schedule'
import scheduleEvents from './utilities/scheduleEvents'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		store: new MongoStore({ mongooseConnection: db }),
		resave: false,
		saveUninitialized: false
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

app.listen(process.env.PORT, () => {
	console.log(`Welcome ${process.env.USER}. Server is listening on ${process.env.PORT}. Let's get cookin'.`)
})

schedule.scheduleJob('*/1 * * * *', function(fireDate){
	let now = new Date()
	scheduleEvents(now)
	console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + now)
})