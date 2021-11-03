const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  if (body.password === undefined) {
    response.status(400).json({
      error: "Password must be provided",
    });
  } else if (body.password.length < 3) {
    response.status(400).json({
      error: "Password must be 3 characters or long",
    });
  } else if (body.username.length < 3) {
    response.status(400).json({
      error: "Username is shorter than the minimum allowed length (3)",
    });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    const savedUser = await user.save();

    response.json(savedUser);
  }
});
usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;