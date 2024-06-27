const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const express = require("express");
const router = express.Router();
router.get("/profile", async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return response.status(401).json({ message: "No token found" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return response.status(401).json({ message: "Token is not valid" });
      }

      try {
        const userDetails = await User.findOne({ _id: user.userId });
        console.log(userDetails);
        if (!userDetails) {
          return response.status(404).json({ message: "User not found" });
        }
        return response.status(200).json({ userDetails });
      } catch (error) {
        console.error("Error finding user details:", error);
        return response.sendStatus(500);
      }
    });
  } catch (error) {
    console.error("Error in profile route:", error);
    response.sendStatus(500);
  }
});

module.exports = router;
