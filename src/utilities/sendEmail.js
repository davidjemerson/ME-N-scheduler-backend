import nodemailer from 'nodemailer';
import moment from 'moment';

const sendInvites = function (event, type) {
	console.log('It\'s email time.');

	const organizerName = `${event.organizer.name.firstName} ${event.organizer.name.lastName}`;
	let emailSubject = `"${event.eventName}" Update...`;
	let emailText = `"${event.eventName}" has been updated. To see what's new visit <link goes here>`;

	if (type === 'invite') {
		emailSubject = `"${event.eventName}" Needs Your Availability`;
		emailText = `${organizerName} has invited you to "${event.eventName}"! \n
Please visit <link goes here> to confirm your availability. If we can find a time that works for at least ${event.winThreshold.toString()} people, the event will be scheduled for the earliest date with the most available people.\n
Happy scheduling!`;
	} else if (type === 'scheduled') {
		emailSubject = `"${event.eventName}" Has Been Scheduled!`;
		emailText = `"${event.eventName}" has been scheduled at ${moment(event.bestDate).format('h:mm a')} on ${moment(event.bestDate).format('dddd, MMMM Do YYYY')}! \n
			Hope you enjoyed using our service!`;
	}

	event.invites.forEach((invite) => {
		console.log(`I'm sending an email to ${invite.email}!`);
        
		async function main(){

			// create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport({
				host: process.env.EMAIL_HOST,
				port: process.env.EMAIL_PORT,
				secure: true, // true for 465, false for other ports
				auth: {
					user: process.env.EMAIL_USER,
					pass: process.env.EMAIL_PASSWORD
				}
			});
          
			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: `"${organizerName}" via Super Scheduler <${process.env.OUTGOING_EMAIL}>`, // sender address
				to: invite.email, // list of receivers
				subject: emailSubject, // Subject line
				text: emailText, // plain text body
				// html: emailHTML // html body
			});
          
			console.log('Message sent: %s', info.messageId);
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		}
          
		main().catch(console.error);
	});
};

export default sendInvites;