const { User } = require("../models/User");

const app = require("express");
const router = app.Router();
router.post("/signup", async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      response.status(403).json({ message: "user already exist" });
      return;
    }
    const user = new User({ username, email, password });
    await user.save();
    response.send(201);
    // response.navigate("/login");
  } catch (error) {
    response.sendStatus(500);
  }
});
module.exports.router = router;
