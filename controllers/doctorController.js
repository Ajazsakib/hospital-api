const Doctor = require('../models/doctor');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds (10-12 is recommended)
const jwt = require('jsonwebtoken');

// Define your JWT secret here
const jwtSecret = 'S1s2s3s4@12';

module.exports.registerDoctor = async function (req, res) {
  try {
    const { name, username, password } = req.body;

    const isDoctorExist = await Doctor.findOne({ username });

    // Check if the username is already registered
    if (isDoctorExist) {
      return res.status(400).json({
        message: 'Doctor with this username already exists',
      });
    }

    // hash the password

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create New Doctor
    const newDoctor = new Doctor({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    console.log('Error in Register Doctor', error);
  }
};

module.exports.loginDoctor = async function (req, res) {
  try {
    const { username, password } = req.body;

    const isDoctorExist = await Doctor.findOne({ username });

    if (!isDoctorExist) {
      return res.status(401).json({ error: "Doctor does'nt exist" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      isDoctorExist.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign(
      { username: isDoctorExist.username, id: isDoctorExist._id },
      jwtSecret,
      {
        expiresIn: '1h', // Adjust as needed
      }
    );

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.log('Error in login user', error);
  }
};
