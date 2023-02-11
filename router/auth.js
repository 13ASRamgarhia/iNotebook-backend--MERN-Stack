const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()
require("../db")
const fetchUser = require('../middleware/fetchUser')

const User = require("../models/User")

//SIGN UP USER
router.get('/api/signup', async (req, res) => {
    const { fullName, email, password } = req.body

    if(!fullName || !email || !password){
        return res.status(422).json({error: "Please enter all fields"})
    }
        User.findOne({email: email})
        .then((userExist) => {
        if(userExist){
            return res.status(422).json({error: "User already registered"})
        }

        const user = new User({fullName, email, password});
        user.save()
        .then(() => {res.status(200).json({message: 'User registered'})})
        .catch(() => {res.status(500).json("Failed to register")})
        }
        )
        .catch(error => {console.log(error)});
})

//LOGIN USER
router.post("/api/login", async (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(422).json({error: "Please enter all data"})
    }

    const userLogin = await User.findOne({email:email})

    if(!userLogin){
        return res.status(422).json({error: "Invalid Email"})
    }

    const isPassMatching = await bcrypt.compare(password, userLogin.password)

    if(!isPassMatching){
        return res.status(422).json({error: "Invalid password"})
    }

    const token = await userLogin.generateAuthToken()
    return res.status(200).json({message: "Login success"})
})

//GET USER
router.post('/api/getUser',fetchUser, async (req, res) => {
    try{
        const userID = req.user;
        const user = await User.findById(userID).select("-password")
        res.send(user)
    }
    catch(error){
        res.status(400).send({error: error});
    }
})

module.exports = router