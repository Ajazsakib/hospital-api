const Patient = require('../models/patient');
const Report = require('../models/report');
const Doctor = require('../models/doctor');

module.exports.createReport = async function (req, res) {
  try {
    const patient = await Patient.findById(req.params.id);

    const newReport = new Report({
      patient: patient._id,
      createdBy: req.user.id,
      status: req.body.status,
    });

    await newReport.save();

    return res.status(201).json({ message: 'Report Created Succesfully' });
  } catch (error) {
    console.log('Error in creating error', error);
  }
};

module.exports.allReports = async function (req, res) {
  try {
    const reports = await Report.find({ patient: req.params.id })
      .populate('patient')
      .populate('createdBy');

    if (!reports) {
      return res.status(410).json({ message: 'No Report Found' });
    }

    const updateReports = reports.map((report) => {
      return {
        patient: report.patient.name,
        createdBy: report.createdBy.name,
        status: report.status,
      };
    });

    return res.status(201).json({ updateReports });
  } catch (error) {
    console.log('Error in fetching report', error);
  }
};

module.exports.listReportByStatus = async function (req, res) {
  try {
    const reports = await Report.find({ status: req.params.status });

    if (!reports) {
      return res.status(400).json({ message: 'Message Not Found' });
    }

    return res.status(201).json({ reports });
  } catch (error) {
    console.log('Error in fetching report list', error);
  }
};
