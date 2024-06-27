const { User } = require("../models/User");
const app = require("express");
const bcrypt = require("bcrypt");
const router = app.Router();
router.post("/signup", async (request, response) => {
  const userDetails = request.body;
  const { username, email, password } = userDetails;
  if (!username || !password || !email) {
    response.status(401).json({ message: "provide valid credentials" });
    return;
  }
  try {
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      response.status(403).json({ message: "user already exist" });
      return;
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPwd });
    await user.save();
    response
      .status(201)
      .json({ message: "Account created successfully", userId: user._id });
  } catch (error) {
    response.sendStatus(500);
  }
});
module.exports = router;
