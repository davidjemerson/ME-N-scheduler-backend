import Event from '../db/models/event';
import checkForWin from '../utilities/checkForWin';
import sendEmail from '../utilities/sendEmail';

const eventControls = {
	findAll: (req, res) => {
		Event
			.find(req.query)
			.populate('organizer')
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	create: (req, res) => {
		Event
			.create(req.body)
			.then( async (dbModel) => {
				let populatedModel = await dbModel.populate('organizer').execPopulate();
				sendEmail(populatedModel, 'invite');
				return res.json(populatedModel);
			})
			.catch((err) => res.status(422).json(err));
	},
	findById: (req, res) => {
		Event
			.findById({'_id': req.params.id})
			.populate('organizer')
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	addResponse: (req, res) => {
		Event
			.findOneAndUpdate({'_id':req.params.id,'invites._id':req.params.inviteId}, { $set: {'invites.$.votes':req.body}}, {new: true})
			.then((dbModel) => {
				const winDate = checkForWin(dbModel);
				if (winDate && dbModel.winMet === false) {
					Event
						.findOneAndUpdate({'_id':req.params.id},{'winMet':true, 'bestDate':winDate},{new:true})
						.then((winModel) => res.json(winModel))
						.catch((err) => res.status(422).json(err));
				} else if (!winDate && dbModel.winMet === true) {
					Event
						.findOneAndUpdate({'_id':req.params.id},{'winMet':false},{new:true})
						.then((noWinModel) => res.json(noWinModel))
						.catch((err) => res.status(422).json(err));
				} else {
					return res.json(dbModel);
				}
			})
			.catch((err) => res.status(422).json(err));
	},
	getEventsToSchedule: (date) => {
		return new Promise (resolve => {
			Event
				.find({'scheduledDate': null, 'winMet': true, 'pollClose': {$lte: date}})
				.populate('organizer')
				.then((dbModel) => resolve(dbModel))
				.catch((err) => err);
		});
	},
	addScheduledDate: (id, date) => {
		Event
			.findOneAndUpdate({'_id':id}, {'scheduledDate':date})
			.then((dbModel) => dbModel)
			.catch((err) => err);
	}
};

export default eventControls;