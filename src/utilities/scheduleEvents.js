import eventControls from '../controllers/eventsController';

const scheduleEvents = async function (date) {
	console.log('I\'m scheduling like a baaws!');
	let notificationList = [];
	let scheduledEvents = await eventControls.getEventsToSchedule(date);
	console.log(scheduledEvents);
	if (scheduledEvents.length > 0) {
		scheduledEvents.forEach(event => {
			eventControls.addScheduledDate(event._id, event.bestDate);
			event.invites.forEach(invite => {
				notificationList.push(
					{
						'Event Name': event.eventName,
						'Scheduled Date': event.bestDate,
						'Email': invite.email
					}
				);
			});
		});
		console.log(notificationList);
	}
};

export default scheduleEvents;