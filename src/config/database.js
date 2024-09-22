const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:Baghpat1997$1@namastenode.vyj26.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
