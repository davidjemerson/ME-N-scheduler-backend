import Router from 'express'
import User from '../../db/models/user'
import passport from '../../passport'

const router = Router()

router.post('/signup', (req, res) => {
    if ( /(@)/.test(req.body.username) ) {
        return res.json({
            error: `@ is an invalid username character`
        })
    }
    User.findOne({ 'local.email': req.body.email}, (err, user) => {
        if (err) {
            console.log('Signup error: ', err)
        } else if (user) {
            return res.json({
                error: `${req.body.email} is already in use`
            })
        } else {
            User.findOne({ 'local.username': req.body.username }, (err, user) => {
                if (err) {
                    console.log('Signup error: ', err)
                } else if (user) {
                    return res.json({
                        error: `${req.body.username} is not available`
                    })
                } else {
                    const newUser = new User({
                        'name.firstName': req.body.firstName,
                        'name.lastName': req.body.lastName,
                        'local.username': req.body.username,
                        'local.email': req.body.email,
                        'local.password': req.body.password
                    })
                    newUser.save((err, savedUser) => {
                        if (err) return res.json(err)
                        req.login(newUser, function(err) {
                            if (err) return res.json(err)
                        })
                        return res.json('/events')
                    })
                }
            })
        }
    })
})

router.post('/login', passport.authenticate('local'), function(req, res) {
    return res.json(req.user)
})

router.get('/user', (req, res, next) => {
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router
