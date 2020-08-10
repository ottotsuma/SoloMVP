const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
//import routes
const authRoute = require('./routes/auth');


dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connected to database!')
);

//Middlewears
app.use(express.json());
app.use(
    cors({
      allowedHeaders: "X-Requested-With, Content-Type, Accept, Authorization"
    })
  );
//   app.use(cors());

//route middlewears
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("server up and running"));
