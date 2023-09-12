const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  status: {
    type: String,
    enum: [
      'Negative',
      'Travelled Quarantine',
      'Symptoms Quarantine',
      'Positive Admit',
    ],
    default: 'Negative',
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
