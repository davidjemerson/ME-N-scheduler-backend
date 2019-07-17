# ME-N-scheduler-backend
MongoDB, Express &amp; Node.js backend for vote based scheduling application

Users create an event and select a pool of available datetimes for the invitees to chose from, with a minimum attendee threshold and a closing date for voting. An email with a response link is sent to invitees who can then choose datetimes that work for them. With each response the server talleys the current voting and designates the earliest date that has passed the threshold and has the most votes as the "bestDate". When the voting window is over, the "bestDate" becomes the "scheduledDate" and a scheduling notification is sent out to all invitees to let them know the outcome.

Event endpoints currently available:

root/events/
* create event
* get all events

root/events/"event id"
* get specific event

root/events/"event id"/"invite id"
* put date selections in specific invite

User endpoints currently available:

root/users/
* create new user
* get all users

root/users/"email address"
* get user with matching email address

root/users/"username"
* get user with matching username