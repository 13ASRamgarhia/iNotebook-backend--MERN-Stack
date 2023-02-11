const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({path: "./CONFIG.env"})

const MONGO_URI = process.env.MONGO_URI

try{
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    console.log("Connection Established.")
}
catch(err){
    console.log("=== ERROR === -> "+err.message)
}