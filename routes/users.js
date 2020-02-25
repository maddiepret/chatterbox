const router = require('express').Router();
//import model
const User = require('../models/User');
//import validation
const validateRegisteInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
//import passport 
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//register user route
router.route('/register')
    .post((req, res) => {
        const { isValid, errors } = validateRegisteInput(req.body)
        if (!isValid) {
            return res.status(404).json(errors)
        }
        //find user with email
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.email = "Email already used"
                }
                //hash the password
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        const newUser = new User({
                            email: req.body.email,
                            login: req.body.login,
                            password: hash
                        })
                        newUser.save()
                            .then(newUser => res.json(newUser))
                            .catch(err => console.log(err))
                    })
                })
            })
    })

//login route
router.route('/login')
    .post((req, res) => {
        const { errors, isValid } = validateLoginInput(req.body)
            //check validation
        if (!isValid) {
            return res.status(404).json(errors)
        }
        //find user with this email
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    //compare the passwords
                    bcrypt.compare(req.body.password, user.password)
                        .then(isMatch => {
                            if (isMatch) {
                                //if it matches generate token
                                const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' }, function(err, token) {
                                    return res.json({
                                        success: true,
                                        token: token
                                    })
                                })
                            } else {
                                errors.password = 'Password is incorrect'
                                return res.status(404).json(errors)
                            }
                        })
                } else {
                    errors.email = 'User not found'
                    return res.status(404).json(errors)
                }
            })
    })

//create route which return user data after authentication
router.route('/')
    .get(passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({
            id: req.user._id,
            email: req.user.email,
            login: req.user.login,
            followers: req.user.followers,
            following: req.user.following
        })

    })

//route to view someones profile
router.route('/:id')
    .get((req, res) => {
        //get the user with their di
        User.findById(req.params.id)
            .then(user => {
                //if user if found show these info
                if (user) {
                    return res.json({
                        _id: user._id,
                        email: user.email,
                        login: user.login,
                        followers: user.followers,
                        following: user.following
                    })
                } else {
                    //otherwise the user could not be found
                    return res.status(404).json({ msg: 'User not found' })
                }
            })
            .catch(err => console.log(err))
    })

//route to follow someone
router.route('/follow')
    .post(
        //get token
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            //get id from person that you want to follow
            User.findOneAndUpdate({
                    _id: req.user.id
                }, {
                    //add that id to the following array
                    $push: { following: req.body.userId }
                }, { new: true })
                .then(user => {
                    User.findOneAndUpdate({
                            _id: req.body.userId
                        }, {
                            //update the amount of follower
                            $push: { followers: req.user.id }
                        }, { new: true })
                        .then(user => res.json({ userId: req.body.userId }))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })


//route to unfollow someone
router.route('/unfollow')
    .post(
        //get token
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            //get id that you want to unfollow
            User.findOneAndUpdate({
                    _id: req.user.id
                }, {
                    //remove that person id from following list
                    $pull: { following: req.body.userId }
                }, { new: true })
                .then(user => {
                    User.findOneAndUpdate({
                            _id: req.body.userId
                        }, {
                            //update amount of followers
                            $pull: { followers: req.user.id }
                        }, { new: true })
                        .then(user => res.json({ userId: req.body.userId }))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    )
router.route('/search')
    .post((req, res) => {
        User.findOne({
                $or: [
                    { email: req.body.text },
                    { login: req.body.text }
                ]
            })
            .then(user => res.json({ userId: user._id }))
            .catch(err => res.status(404).json({ msg: 'User not found' }))
    })


module.exports = router