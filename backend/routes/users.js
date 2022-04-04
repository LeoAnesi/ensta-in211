const express = require("express");
const { getRepository } = require("typeorm");
const User = require("../entities/user");
const router = express.Router();

router.get("/", function (req, res) {
  getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post("/new", function (req, res) {
  const userRepository = getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === "23505") {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the user" });
      }
    });
});

router.delete("/:userId", function (req, res) {
  getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: "User successfully deleted" });
    })
    .catch(function () {
      res.status(500).json({ message: "Error while deleting the user" });
    });
});

module.exports = router;
