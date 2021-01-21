const express = require('express');
const router = express.Router();
const verify = require('../verify');
const tutorUpdateProfile = require('../models/UpdateProfile/TutorUpdateProfile');
const studentUpdateProfile = require('../models/UpdateProfile/StudentUpdateProfile');

router.get('/tutor/:id', verify, async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await tutorUpdateProfile.findOne({ userId: id.toString() });
    if (tutor) {
      console.log(tutor);
      res.send({ status: true, statusCode: 200, data: tutor });
    } else {
      res.json({
        status: false,
        statusCode: 404,
        message: 'Tutor not found with this id',
      });
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

router.get('/student/:id', verify, async (req, res) => {
  try {
    const { id } = req.params;
    const tutor = await studentUpdateProfile.findOne({ userId: id.toString() });
    if (tutor) {
      console.log(tutor);
      res.send({ status: true, statusCode: 200, data: tutor });
    } else {
      res.json({
        status: false,
        statusCode: 404,
        message: 'Tutor not found with this id',
      });
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

module.exports = router;
