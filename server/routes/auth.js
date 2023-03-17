const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const router = express.Router();

// router 1: create user using "POST" method
router.post('/register', async (req, res) => {

    const { name, email, phone, password, cpassword, department } = req.body;

    if (!name || !email || !department || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Please filled all the fields" })
    }

    try {

        if (password !== cpassword) {
            return res.status(422).json({ error: "confirm password should be same password" });
        }

        let userData = await User.findOne({ email: email });

        if (userData) {
            return res.status(422).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);

        userData = new User({ name: name, email, phone, password: securePassword, department});

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

    const { department, email, password } = req.body;

    if (!department || !email || !password) {
        return res.status(422).json({ error: "Please filled all the fields" })
    }

    try {

        const userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        if(department !== userData.department){
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

        res.status(201).json({ message: "User successfully SignIn", authtoken});

    } catch (error) {
        console.log(error);
        res.status(500).send('some error occured');
    }

})


// router 3: get loggedin user details using POST
router.post('/userdetail', fetchuser, async (req, res)=>{

    try {
        const userId = req.empid.id;
        const userData = await User.findById(userId).select("-password");
        res.send(userData);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('some error occured');
    }
})


module.exports = router;