import Event from '../models/event';
import checkForWin from '../utilities/checkForWin';

const eventControls = {
	findAll: (req, res) => {
		Event
			.find(req.query)
			.populate('organizer', ['firstName', 'lastName', 'email'])
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	create: (req, res) => {
		Event
			.create(req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	findById: (req, res) => {
		Event
			.findById({'_id': req.params.id})
			.populate('organizer', ['firstName', 'lastName', 'email'])
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
	}
};

export default eventControls;