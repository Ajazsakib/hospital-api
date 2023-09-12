const Patient = require('../models/patient');

module.exports.registerPatient = async function (req, res) {
  try {
    const { name, phoneNumber } = req.body;

    const isPatientExist = await Patient.findOne({ phoneNumber });

    if (isPatientExist) {
      return res
        .status(400)
        .json({ message: 'Patient already exists.', isPatientExist });
    }

    const newPatient = new Patient({
      name: name,
      phoneNumber: phoneNumber,
    });

    await newPatient.save();

    res.status(201).json({ message: 'Patient registration successful.' });
  } catch (error) {
    console.log('Error in adding patient', error);
  }
};
