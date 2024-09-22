const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// work for ab and abc
// app.get("/ab?c", (req, res) => {
//   // b is optional
//   res.send({ firstName: "Arya", lastname: "Chauhan" });
// });

// // work for ad and abcd
// app.get("/a(bc)?d", (req, res) => {
//   // bc is optional
//   res.send({ firstName: "Arya", lastname: "Chauhan" });
// });

// // work for abc, abbc, abbbc, abb....bc
// app.get("/ab+c", (req, res) => {
//   // b can come any number of times
//   res.send({ firstName: "Arya", lastname: "Chauhan" });
// });

// // work for abcd, abAryacd
// app.get("/ab*cd", (req, res) => {
//   // anything can come in between b and c
//   res.send({ firstName: "Arya", lastname: "Chauhan" });
// });

// app.get("/user/:userId", (req, res) => {
//   console.log(req.params); // return all request parans data , Ex: { userId: 101 };
//   console.log(req.query); // return all queryparams data, Ex: { name: "Arya" };

//   res.send({ firstName: "Arya", lastname: "Chauhan" });
// });

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Arya", lastname: "Chauhan" });
// });

// app.post("/user", (req, res) => {
//   res.send("Data successfully saved to the database");
// });

// app.delete("/user", (req, res) => {
//   res.send("Data deleted successfully!..");
// });

// app.use("/test", (req, res) => {
//   res.send("Hello from the test");
// });

app.post("/signup", async (req, res) => {
  // creating a new instance of User model
  const user = new User({
    firstName: "Arya",
    lastName: "Chauhan",
    emailId: "aryachauhan03@gmail.com",
    password: "aryachauhan03",
  });
  try {
    await user.save();
    res.send("User added succesfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777...");
    });
  })
  .catch((e) => {
    console.log("Database cannot be connected!!");
  });
