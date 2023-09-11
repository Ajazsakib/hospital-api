const Doctor = require("../models/doctor")
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds (10-12 is recommended)
module.exports.registerDoctor = async function (req, res)
{
    try {
        const { name, username, password } = req.body

        const isDoctorExist = await Doctor.findOne({ username })

        // Check if the username is already registered
        if (isDoctorExist) {
            return res.status(400).json({
                message: "Doctor with this username already exists"
            })
        }

        // hash the password

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Create New Doctor
        const newDoctor = new Doctor({
            name: name,
            username: username,
            password: hashedPassword
        })

        await newDoctor.save();

        res.status(201).json({ message: 'Doctor registered successfully' });


    } catch (error) {
        console.log("Error in Register Doctor", error)
    }

}