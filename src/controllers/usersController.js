import User from '../db/models/user';

const userControls = {
	findAll: (req, res) => {
		User
			.find(req.query)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},	
	findByEmail: (req, res) => {
		User
			.findOne( {'local.email': req.params.userEmail} )
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},	
	findByUsername: (req, res) => {
		User
			.findOne( {'local.username': req.params.username} )
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},	
	create: (req, res) => {
		User
			.create(req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
};

export default userControls;