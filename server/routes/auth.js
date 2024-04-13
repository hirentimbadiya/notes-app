const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "Asecretstring";

// Create user using POST request
router.post(
  "/createUser",
  [
    // name minimum length of 3
    body("name", "Name must be 3 chars long").isLength({ min: 3 }),
    // username must be an email
    body("email", "Enter valid Email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be 6 chars long").isLength({ min: 6 }),
  ],
  async (req, res) => {

    let success = false;

    // If there is an error mentioned above then return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Even if there is not any error by client side but if some error occurs at server side for that this try catch block is used.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({ error: "User Already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
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
      success = true;
      console.log(data);
      res.json(authToken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

// Authenticating the user using POST "/api/auth/login"
router.post(
  "/login",
  [
    // username must be an email
    body("email", "Enter valid Email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password cannot be blank").exists(),
  ],

  async (req, res) => {
    let success = false;

    // If there is an error mentioned above then return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      success= true;
      res.send({success, authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

// Get logged in user details using POST "api/auth/getuser"
router.post(
  "/getuser", async (req, res) => {
    try{
      // accessing the id which we stored in fetchuser file
      userId = req.id;
      const user = await User.findById(userId).select("-password");
      res.send({user});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

module.exports = router;
