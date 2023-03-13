const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateRandomAvatar } = require("./avatar");

//REGISTER
router.post("/create", async (req, res) => {
  try {
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const { image } = await generateRandomAvatar(req.body.email)
    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      avatar:image,
      password: hashedPassword
    });

    // Save user and respond
    const user = await newUser.save();
    res.status(200).json({
      message: "Account created successfully!!",
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
