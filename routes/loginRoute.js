const app = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const router = app.Router();
router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const userExists = await User.findOne({ email: username });
    if (!userExists) {
      response.status(404).json({ message: "user not found" });
      return;
    }
    if (userExists.password !== password) {
      response.status(401).json({ message: "password not match" });
      return;
    }
    if (userExists.password === password) {
      const jwt_token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      response.status(200).json({ jwt_token });
    }
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
});
module.exports = router;
