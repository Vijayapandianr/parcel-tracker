const express = require('express');
const router = express.Router();
const Parcel = require('../models/Parcel');

// Create parcel (Admin)
router.post('/', async (req, res) => {
  try {
    const parcel = new Parcel(req.body);
    await parcel.save();
    res.status(201).json(parcel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get parcel by tracking ID (User)
router.get('/:trackingId', async (req, res) => {
  try {
    const parcel = await Parcel.findOne({ trackingId: req.params.trackingId });
    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    res.json(parcel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update parcel (Admin)
router.put('/:trackingId', async (req, res) => {
  try {
    const parcel = await Parcel.findOneAndUpdate(
      { trackingId: req.params.trackingId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    res.json(parcel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete parcel (Admin)
router.delete('/:trackingId', async (req, res) => {
  try {
    const parcel = await Parcel.findOneAndDelete({ trackingId: req.params.trackingId });
    if (!parcel) return res.status(404).json({ message: 'Parcel not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List parcels with optional query
router.get('/', async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({ createdAt: -1 }).limit(100);
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
