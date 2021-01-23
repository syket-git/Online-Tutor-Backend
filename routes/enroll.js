const express = require('express');
const router = express.Router();
const EnrollSchema = require('../models/Enroll/Enroll');
const verify = require('../verify');

//Student Enroll
router.post('/', verify, async (req, res) => {
  try {
    const enroll = new EnrollSchema({
      tutorId: req.body.tutorId,
      studentId: req.body.studentId,
      postId: req.body.postId,
    });

    await enroll.save();
    res.json({ status: true, message: 'Enroll successfully done' });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

//Search by Student Id

router.get('/student/:id', verify, async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await EnrollSchema.find({ studentId: id.toString() });
    if (!posts)
      return res.get({
        status: false,
        message: "You don't have any enrolled post",
      });

    res.json({ status: true, data: posts });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

module.exports = router;
