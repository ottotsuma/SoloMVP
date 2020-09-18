const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {
  registerValidation,
  loginValidation,
} = require("./../model/Validation");

router.get("/", (req, res) => {
  res.json({message: "Server is running"})
})

router.post("/register", async (req, res) => {
  console.log(req.body)
  console.log("start");
  //LETS VALIDATE THE DATA BEFORE WE ADD A User
  const { error } = registerValidation(req.body);
  console.log(error)
  if (error) return res.status(400).send(error.details[0].message);
console.log('stage 1 ')
  //check log if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  console.log('stage 2 ')
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log('stage 3 ')
  //Create a new user
  const user = new User({
    message: req.body.message,
    email: req.body.email,
    password: hashedPassword,
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
  const email = req.params.email;
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  try {
    await User.deleteOne({ email: email });
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(400).send(error);
  }
});

// get info
router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update
router.patch("/patch", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    res.status(200).send("No user by that name.");
  }
  console.log("patches");
  try {
    const updateObject = req.body;
    const id = user.id;
    const updatedUser = await User.update({ _id: id }, { $set: updateObject });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// login
router.post("/login", async (req, res) => {
  console.log("login");
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password is Wrong");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or Password is Wrong");

  // create and assign a token
  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json({ auth: true, token: token, user: user });
  // console.log(user.message)
  // res.send(user);
});

// fake route for testing the token
router.get("/me", function (req, res) {
  // console.log(req.headers)
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, async function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    console.log(decoded);
    await User.findById(
      decoded.userId,
      { password: 0 }, // projection
      function (err, user) {
        if (err)
          return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
      }
    );
  });
});

// post messages
router.patch("/store", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  console.log(user)
  if(!user) {res.status(200).send("No user by that name.")}
  console.log("storing")
  try {
    const updateObject = req.body;
    const value = updateObject.message
    console.log(value)
    const id = user.id;
    const updatedUser = await User.update({_id: id}, {$addToSet: {tags: value}});
    res.status(200).send(updatedUser)
  } catch (error) {
    res.status(400).send(error)
  }
});

// deletes item in storage
router.patch("/update", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  
  if(!user) {res.status(200).send("No user by that name.")}
  console.log("updating storage")
  try {
    const updateObject = req.body;
    const value = updateObject.message
    console.log(value)
    const id = user.id;
    const updatedUser = await User.update({_id: id}, {$pull: {tags: value}});
    res.status(200).send(updatedUser)
  } catch (error) {
    res.status(400).send(error)
  }
});

// forgot password
router.patch("/forgot", async function (req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(200).send("No user by that name.");
  }
  console.log("changing password");
  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // replace the users password
    const updateObject = req.body;
    updateObject.password = hashedPassword;
    updateObject.message = "Changed-Password";
    const id = user.id;
    const updatedUser = await User.update({ _id: id }, { $set: updateObject });
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});



/* I AM HERE */
// forgotten password - named different so they don't mix
router.post("/forgotten", function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            //   console.log('error', 'No account with that email address exists.');
            req.flash("error", "No account with that email address exists.");
            return res.redirect("/forgotten");
          }
          console.log("step 1");
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        console.log("step 2");

        var smtpTrans = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
        var mailOptions = {
          to: user.email,
          from: process.env.EMAIL,
          subject: "Node.js Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        console.log("step 3");

        smtpTrans.sendMail(mailOptions, function (err) {
          req.flash(
            "success",
            "An e-mail has been sent to " +
              user.email +
              " with further instructions."
          );
          console.log("sent");
          res.send(`Email has been sent to ${user.email}`) // swap me for the comment below in production
          // res.redirect("/forgotten");
          // https://levelup.gitconnected.com/multi-purposes-mailing-api-using-nodemailer-gmail-google-oauth-28de49118d77
        });
      },
    ],
    function (err) {
      console.log("this err" + " " + err);
      res.redirect("/");
    }
  );
});

router.get("/forgotten", function (req, res) {
  res.render("forgotten", {
    User: req.user,
  });
});

// reset password

router.get("/reset/:token", function (req, res) {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      console.log(user);
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgotten");
      }
      res.render("reset", {
        User: req.user,
      });
    }
  );
});

router.post("/reset/:token", function (req, res) {
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user, next) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            console.log("password" + user.password + "and the user is" + user);

            user.save(function (err) {
              if (err) {
                console.log("here");
                return res.redirect("back");
              } else {
                console.log("here2");
                req.logIn(user, function (err) {
                  done(err, user);
                });
              }
            });
          }
        );
      },

      function (user, done) {
        // console.log('got this far 4')
        var smtpTrans = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
            // put email and password into here maybe use dotenv for both
          },
        });
        var mailOptions = {
          to: user.email,
          from: process.env.EMAIL,
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            " - This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTrans.sendMail(mailOptions, function (err) {
          // req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      },
    ],
    function (err) {
      res.redirect("/");
    }
  );
});

module.exports = router;
