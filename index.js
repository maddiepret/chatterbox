const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

//setup enviroment
dotenv.config();
//initialize express in app
const app = express();

//Connect to Mongo
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

// Define the routes
//passport
passport.use(passport.initialize());
require('./config/passport')(passport);
//users
const users = require('./routes/users')
app.use('/api/users', users);
//posts
const posts = require('./routes/posts')
app.use('/api/posts', posts)

//set up port to listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Sever started on port: ${PORT}`));