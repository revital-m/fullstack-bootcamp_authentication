const express = require("express");
const User = require("../models/user");
const router = express.Router();

//* Can add users.
router.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//* Can update a user: password, email and name.
router.patch("/api/users/update/:id", async (req, res) => {
  try {
    const toUpdateArr = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password"];
    const isValid = toUpdateArr.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValid) {
      return res.status(400).send("Invalid update!");
    }
// add
    const result = await User.findById()
    if (!result) {
      return res.status(404).send("user not found");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//* Can fetch all users.
router.get("/api/users", async (req, res) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//* Can fetch all details of a particular user.
router.get("/api/users/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).send("user not found");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
