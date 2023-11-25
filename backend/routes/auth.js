const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var JWT_SECRET = "prafulnayakjadhav";
const fetchuser=require('../middleware/fetchuser')

// Create a user using POST "/api/auth/createuser" doesn't require authentication
//route 1 for creating user
router.post(
  "/createuser",
  // Validating the user details
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success=false
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        let user =await User.findOne({email:email.body.email})
        if(user){
          return res.status(400).json({success,error:"user already exist with this email id"})
        }
      } catch (error) {
        
      }
      // check that user have the unique email
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      // console.log(authToken)
      // res.json(user);
      success=true
      res.json({success,authToken });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Authenticate a user using POST "/api/auth/login" doesn't require authentication
//route 2 for login authentication
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //retriving data form body
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res.status(400).json({ error: "invalid credentials" });
      }
      //comparing password using bcrypt compate method which consist two argument string,hash
      const comparepass = await bcrypt.compare(password, user.password);
      if (!comparepass) {
        success=false
        return res.status(400).json({success,error: "invalid credentials" });
      }
      //getting the user data in form of jwt token for verification of credentials
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({success,authToken });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

// route 3 for getting user details using POST "/api/auth/getuser"

router.post("/getuser",fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
