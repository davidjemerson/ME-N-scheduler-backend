import eventControls from '../controllers/eventsController';
import sendEmail from './sendEmail';

const scheduleEvents = async function (date) {
	console.log('I\'m scheduling like a baaws!');
	let scheduledEvents = await eventControls.getEventsToSchedule(date);
	if (scheduledEvents.length > 0) {
		scheduledEvents.forEach(event => {
			eventControls.addScheduledDate(event._id, event.bestDate);
			sendEmail(event, 'scheduled');
		});
	}
};

export default scheduleEvents;