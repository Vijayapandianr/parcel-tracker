const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  sender: String,
  receiver: String,
  status: { type: String, default: 'Pending' },
  location: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parcel', parcelSchema);
