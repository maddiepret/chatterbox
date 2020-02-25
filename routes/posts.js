const router = require('express').Router()
const passport = require('passport')
const Post = require('../models/Post')

router.route('/add')
    .post(
        //get auth
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            const text = req.body.text.trim()
                //add new post to user logged in 
            const newPost = new Post({
                    user: {
                        id: req.user.id,
                        login: req.user.login
                    },
                    //add post
                    text
                })
                //save post
            newPost.save()
                .then(post => res.json(post))
                .catch(err => console.log(err))
        })

router.route('/')
    .get((req, res) => {
        Post.find()
            .sort({ createdAt: -1 })
            .then(posts => res.json(posts))
            .catch(err => console.log(err))
    })

//get user post by using the user id
router.route('/:_userId')
    .get((req, res) => {
        //use find method to get the user id
        Post.find({ 'user.id': req.params.userId })
            .sort({ cretedAt: 1 })
            //get user posts with date they were created
            .then(posts => res.json(posts))
            .catch(err => console.log(err))
    })


module.exports = router