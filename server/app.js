const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { graphqlHTTP } = require("express-graphql");
const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyDZm36ZcIGa4ZkghfCjl8GZxqUtviXlVcw",
  authDomain: "phonebook-3cebb.firebaseapp.com",
  databaseURL: "https://phonebook-3cebb-default-rtdb.firebaseio.com",
  projectId: "phonebook-3cebb",
  storageBucket: "phonebook-3cebb.appspot.com",
  messagingSenderId: "465285460394",
  appId: "1:465285460394:web:31e5a7816e0e00c557fbd3"
};
firebase.initializeApp(config);

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);

const userSchema = require('./graphql').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

module.exports = app;
