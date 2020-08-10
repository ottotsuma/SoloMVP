const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {registerValidation, loginValidation} = require('./../model/Validation');

router.post('/register', async (req, res) => {
console.log("start")
//LETS VALIDATE THE DATA BEFORE WE ADD A User
const {error} = registerValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);

//check log if the user is already in the database
const emailExist = await User.findOne({email: req.body.email});
if (emailExist) return res.status(400).send('Email already exists');

// hash the password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);


//Create a new user
   const user = new User({
    message: req.body.message,
       email: req.body.email,
       password: hashedPassword
   });
   try {
       const savedUser = await user.save();
       res.send(savedUser);
   } catch (err) {
       res.status(400).send(err);
   }
});

// delete user
router.delete("/delete", async (req, res) => {
  const email = req.params.email
  const user = await User.findOne({email: req.body.email});
  console.log(user);
  try {
    await User.deleteOne({"email": email})
    res.status(200).send("Deleted")
  } catch (error) {
    res.status(400).send(error)
  }
});

// get info
router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
});

// update
router.patch("/patch", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  console.log(user)
  if(!user) {res.status(200).send("No user by that name.")}
  console.log("patches")
  try {
    const updateObject = req.body;
    const id = user.id;
    const updatedUser = await User.update({_id: id}, {$set: updateObject});
    res.status(200).send(updatedUser)
  } catch (error) {
    res.status(400).send(error)
  }
});

// login
router.post('/login', async (req, res) => {
  console.log("login")
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or Password is Wrong')
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Email or Password is Wrong');

    // create and assign a token
    console.log(user.message)
    // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.send(user);
});

module.exports = router;