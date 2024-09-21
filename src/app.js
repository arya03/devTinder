const express = require("express");

const app = express();

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
  console.log("Server running");
});
