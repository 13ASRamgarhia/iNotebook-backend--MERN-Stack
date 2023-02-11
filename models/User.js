const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const date = new Date();
let dateAsText = date.toString();
let userSignedInDate = dateAsText.slice(4,24)

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: userSignedInDate
    },
    tokens: [
        {
            token: {
            type: String,
            required: true
            }
        }
    ]
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash((this.password), 12)
    }
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token;
    }
    catch(err){
        console.log(err.message)
    }
}

const User = mongoose.model("user", userSchema)

module.exports = User;