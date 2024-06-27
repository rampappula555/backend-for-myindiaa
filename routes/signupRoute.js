const User = require("../models/User");
const app = require("express");
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
    const user = new User({ username, email, password });
    await user.save();
    response.send(201).json({ message: "account created successfully" });
    // response.navigate("/login");
  } catch (error) {
    response.sendStatus(500);
  }
});
module.exports = router;
