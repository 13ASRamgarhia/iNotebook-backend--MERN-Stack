const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()
require("../db")
const fetchUser = require('../middleware/fetchUser')

const User = require("../models/User")

//SIGN UP USER
router.post('/api/signup', async (req, res) => {
    const { fullName, email, password } = req.body

    if(!fullName || !email || !password){
        return res.send("Please enter all fields")
    }
        await User.findOne({email: email})
        .then((userExist) => {
        if(userExist){
            return res.send("User already registered")
        }

        const user = new User({fullName, email, password});
        user.save()
        .then(() => {res.send('User registered successfully')})
        .catch(() => {res.send("Failed to register")})
        }
        )
        .catch(error => {console.log(error)});
})

//LOGIN USER
router.post("/api/login", async (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.send("Please enter all data")
    }

    const userLogin = await User.findOne({email:email})

    if(!userLogin){
        return res.send("Invalid credentials")
    }

    const isPassMatching = await bcrypt.compare(password, userLogin.password)

    if(!isPassMatching){
        return res.send("Invalid credentials")
    }

    const token = await userLogin.generateAuthToken()
    console.log(token)
    res.cookie("jwtToken", token, {
        exprires: new Date(Date.now + (1000*60*3)),
        httpOnly: true
    })
    return res.send("User logged in successfully")
})

//GET USER
router.post('/api/getUser',fetchUser, async (req, res) => {
    try{
        const userID = req.user;
        const user = await User.findById(userID).select("-password")
        res.send(user)
    }
    catch(error){
        res.send(error.message);
    }
})

module.exports = router