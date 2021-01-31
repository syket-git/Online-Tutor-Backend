const express = require('express');
const router = express.Router();
const verify = require('../verify');
const StudentRegister = require('../models/auth/StudentRegister');
const TutorPostSchema = require('../models/TutorPost/TutorPost');
const mongoose = require('mongoose');

//Student Enroll
router.post('/', verify, async (req, res) => {
  try {
    const enroll = await TutorPostSchema.findOneAndUpdate(
      { _id: req.body.postId },
      { $push: { enrolled: req.body.studentId.toString() } }
    );

    if (enroll) {
      res.json({ status: true, message: 'Enroll successfully done' });
    } else {
      res.json({
        status: false,
        message: "We couldn't find any post in this id",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

// Get Student Profile
router.get('/student/:id', verify, async (req, res) => {
  const { id } = req.params;
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const posts = await StudentRegister.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $lookup: {
          from: 'tutorpostschemas',
          localField: 'profile.userId',
          foreignField: 'enrolled',
          as: 'enrolled_post',
        },
      },

      {
        $project: { password: 0, enrolled_post: { _id: 0, enrolled: 0 } },
      },
    ]);

    if (posts) {
      res.send({ status: true, statusCode: 200, data: posts[0] });
    } else {
      res.send({ status: false, statusCode: 404 });
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

module.exports = router;
