const mongoose = require("mongoose");

// insert correct uri 
const uri = "";

function connect(){
    const options = {useNewUrlParser: true};
    mongoose.connect(uri, options). then(
        ()=>{
            console.log("database connection established")
        },
        (err)=>{
            console.log("error connection database instance due to: ", err);
        }
    );
}
module.exports = connect;