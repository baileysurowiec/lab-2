const mongoose = require("mongoose");

// insert correct uri 
const uri ="";


function connect() {
    const options = { useNewUrlParser: true };
    mongoose.connect(uri, options).then(
      () => {
        console.log("Database connection established!");
      },
      (err) => {
        console.log("Error connecting Database instance due to: ", err);
      }
    );
  }
  module.exports = connect;