import passport from 'passport'
import LocalStrategy from './localStrategy'
import User from '../db/models/user'

passport.serializeUser((user, done) => {
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	User.findOne(
		{ _id: id },
		'name.firstName name.lastName local.email',
		(err, user) => {
			done(null, user)
		}
	)
})

// ==== Register Strategies ====
passport.use(LocalStrategy)

module.exports = passport
