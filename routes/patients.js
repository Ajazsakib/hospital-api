const express = require('express');

const verifyToken = require('../utils/verifyToken');

const router = express.Router();

const patientController = require('../controllers/patientController');

const reportController = require('../controllers/reportController');

router.post(
  '/register',
  verifyToken.verifyToken,
  patientController.registerPatient
);

router.post(
  '/:id/create_report',
  verifyToken.verifyToken,
  reportController.createReport
);

router.get(
  '/:id/all_report',
  verifyToken.verifyToken,
  reportController.allReports
);

module.exports = router;
