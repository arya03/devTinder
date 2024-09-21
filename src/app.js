const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the test");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the hello");
});

app.use("/", (req, res) => {
  res.send("Hello from the root");
});

app.listen(3000, () => {
  console.log("Server running");
});
