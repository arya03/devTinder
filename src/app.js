const express = require("express");

const app = express();

// work for ab and abc
app.get("/ab?c", (req, res) => {
  // b is optional
  res.send({ firstName: "Arya", lastname: "Chauhan" });
});

// work for ad and abcd
app.get("/a(bc)?d", (req, res) => {
  // bc is optional
  res.send({ firstName: "Arya", lastname: "Chauhan" });
});

// work for abc, abbc, abbbc, abb....bc
app.get("/ab+c", (req, res) => {
  // b can come any number of times
  res.send({ firstName: "Arya", lastname: "Chauhan" });
});

// work for abcd, abAryacd
app.get("/ab*cd", (req, res) => {
  // anything can come in between b and c
  res.send({ firstName: "Arya", lastname: "Chauhan" });
});

app.get("/user/:userId", (req, res) => {
  console.log(req.params); // return all request parans data , Ex: { userId: 101 };
  console.log(req.query); // return all queryparams data, Ex: { name: "Arya" };

  res.send({ firstName: "Arya", lastname: "Chauhan" });
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Arya", lastname: "Chauhan" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to the database");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted successfully!..");
});

app.use("/test", (req, res) => {
  res.send("Hello from the test");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777...");
});
