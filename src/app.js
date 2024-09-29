const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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

/* app.get("/user", async (req, res) => {
  // creating a new instance of User model
  try {
    // returms all users in array with the specified emailId
    // const users = await User.find({ emailId: req.body.emailId });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }

    // returns first match only
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

// Feed API - GET/Feed - get all users from the database

app.get("/feed", async (req, res) => {
  // creating a new instance of User model
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.send("User deleted successfully");
    } else {
      res.send("User not found");
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "photoUrl", "about", "gender", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (user) {
      res.send("User updated successfully");
    } else {
      res.send("User not found");
    }
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
  }
}); */

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
