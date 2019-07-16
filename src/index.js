import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import schedule from 'node-schedule';

import scheduleEvents from './utilities/scheduleEvents';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

mongoose.connect(process.env.LOCAL_MONGO_URL, {useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true})
	.then(async () => {
		console.log(`Connected to MongoDB URI ${process.env.LOCAL_MONGO_URL}`);
		app.listen(process.env.PORT, () => {
			console.log(`Welcome ${process.env.USER}. Server is listening on ${process.env.PORT}. Let's get cookin'.`);
		});
	});

schedule.scheduleJob('*/30 * * * * *', function(fireDate){
	let now = new Date();
	scheduleEvents(now);
	console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + now);
});