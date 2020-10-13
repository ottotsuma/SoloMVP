const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
//import routes
const authRoute = require('./routes/auth');
var flash = require('connect-flash');
var session=require('express-session');

app.use(session({
  secret: 'secret',
  cookie:{maxAge:60000},
  resave: false,
  saveUninitialized: false
}));
dotenv.config();

// The server is also hosted at this address if you cannot connect without DB_Connect
// https://stagesolo.herokuapp.com/
//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to database!')
);

//Middlewears
app.use(express.json());
app.use(
    cors({
      allowedHeaders: "X-Requested-With, Content-Type, Accept, Authorization"
    })
  );
//   app.use(cors());
app.use(flash());

//route middlewears
app.use('/api/user', authRoute);

app.listen(process.env.PORT || 3000, () => console.log("server up and running"));
