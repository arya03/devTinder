const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

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

app.use(express.json());

app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    // Validate signup data

    validateSignUpData(req);

    // Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    // creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added succesfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //TODO: Validate emailId

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Create a JWT token

    const token = await user.getJWT();

    // Add a token to the cookie and send the response back to the user

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
    }); // cookie will expires in 8hrs

    res.send("Login Successful!!");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.get("/user", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
});

app.post("/sendconnectionrequest", userAuth, (req, res) => {
  const user = req.user;

  res.send(user.firstName + " sent the connection request");
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
