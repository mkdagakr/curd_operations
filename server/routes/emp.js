const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Emp = require('../models/empSchema');

const router = express.Router();

// Router 1: add employee information using POST Method:
router.post('/addemployee', fetchuser, async (req, res) => {

    try {

        const { name, email, phone, department } = req.body;

        const empData = new Emp({ name, email, phone, department });

        const saveData = await empData.save();

        res.json(saveData);

    } catch (error) {
        console.log(error)
        res.status(500).send('some error occured');
    }
})

// Router 2: get all employee data using GET Method:
router.get('/employees', fetchuser, async (req, res) => {

    try {

        const department  = req.header('department');
        let empData;

        if (department === "Administrative") {
            empData = await Emp.find({});
        } else{
            empData = await Emp.find({department});
        }

        res.json(empData);

    } catch (error) {
        res.status(500).send('some error occured');
    }
})

// Router 3: update existing details using PUT
router.put('/updatedata/:id', fetchuser, async (req, res) => {

    try {
        let empData = await Emp.findById(req.params.id);

        if (!empData) {
            return res.status(404).send('Details Not Found')
        }

        empData = await Emp.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.json(empData);

    } catch (error) {
        res.status(500).send('some error occured');
    }
})


// Router 4: delete existing details using DELETE
router.delete('/deletedata/:id', fetchuser, async (req, res) => {

    try {
        let empData = await Emp.findById(req.params.id);

        if (!empData) {
            return res.status(404).send('Details Not Found')
        }

        empData = await Emp.findByIdAndDelete(req.params.id);
        res.json({ Details: 'Successfully deleted', empData });

    } catch (error) {
        res.status(500).send('some error occured');
    }
})


module.exports = router;