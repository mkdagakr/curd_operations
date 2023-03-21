const express = require('express');

// import middleware
const fetchuser = require('../middleware/fetchuser');

// import mongoose user schema
const User = require('../models/userSchema');

// import bcrypt for hash the password
const bcrypt = require('bcryptjs');

// import jsonwebtoken for safely login or logout
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const router = express.Router();

// router 1: create user using "POST" method
router.post('/register', async (req, res) => {

    const { name, email, phone, password, cpassword, department, username } = req.body;

    if (!name || !email || !department || !phone || !password || !cpassword || !username) {
        return res.status(422).json({ error: "Please filled all the fields" })
    }

    try {

        if (password !== cpassword) {
            return res.status(422).json({ error: "confirm password should be same password" });
        }

        let userData = await User.findOne({ email });

        if (userData) {
            return res.status(422).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);

        userData = new User({ name: name, email, phone, password: securePassword, department, username });

        await userData.save();

        const data = {
            user: {
                id: userData.id
            }
        }

        const authtoken = jwt.sign(data, jwt_secret);

        res.status(201).json({ message: "User registered successfully", authtoken })


    } catch (error) {
        console.log(error);
        res.status(500).send('some error occured');
    }

})



//  router 2: login user using "POST" method
router.post('/signin', async (req, res) => {

    const { department, userId, password } = req.body;

    if (!department || !userId || !password) {
        return res.status(422).json({ error: "Please filled all the fields" })
    }

    try {

        const userData = await User.findOne({ email: userId });

        if (!userData) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        if (department !== userData.department) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, userData.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const data = {
            user: {
                id: userData.id
            }
        }

        const authtoken = jwt.sign(data, jwt_secret);

        res.status(201).json({ message: "User successfully SignIn", authtoken });

    } catch (error) {
        console.log(error);
        res.status(500).send('some error occured');
    }

})


// router 3: get loggedin user details using POST
router.post('/userdetail', fetchuser, async (req, res) => {

    try {
        const userId = req.empid.id;
        const userData = await User.findById(userId).select("-password");
        res.send(userData);

    } catch (error) {
        console.log(error);
        res.status(500).send('some error occured');
    }
})

// router 4: get all users details using POST
router.post('/alluserdetails', fetchuser, async (req, res) => {

    try {

        const department = req.header('department');
        let userData;

        if (department === "Administrative") {
            userData = await User.find({}).select("-password");
        }

        res.send(userData);

    } catch (error) {
        console.log(error);
        res.status(500).send('some error occured');
    }
})


module.exports = router;