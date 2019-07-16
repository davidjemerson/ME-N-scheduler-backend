import mongoose from 'mongoose';

const inviteSchema = new mongoose.Schema({
	email: { type: String, required: true },
	responseDate: Date,
	votes: [ Date ]
});

const eventSchema = new mongoose.Schema({
	eventName: { type: String, required: true },
	organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	eventLocation: { type: String, required: true },
	datePool: [ { type: Date, required: true } ],
	invites: [ inviteSchema ],
	winThreshold: { type: Number, required: true },
	winMet: { type: Boolean, default: false },
	pollClose: { type: Date, required: true },
	bestDate: Date,
	scheduledDate: Date
});

const Event = mongoose.model('Event', eventSchema);

export default Event;