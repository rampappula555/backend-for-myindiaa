const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { router } = require("./routes/signupRoute");
const { router1 } = require("./routes/loginRoute");
const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 5500;
app.use("/user", router);
app.use("/users", router1);
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("connected");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
