import User from '../db/models/user'
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	function(username, password, done) {
		User.findOne().or([{ 'local.email': username }, { 'local.username': username }])
			.then( user => {
			if (!user) { return done(null, false, { message: 'No account matching that email or username' }) }
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
			})
			.catch(err => done(err))
	}
)


module.exports = strategy