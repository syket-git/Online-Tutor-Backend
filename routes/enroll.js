const express = require('express');
const router = express.Router();
const EnrollSchema = require('../models/Enroll/Enroll');
const verify = require('../verify');
const studentUpdateProfile = require('../models/UpdateProfile/StudentUpdateProfile');
const { response } = require('express');
const TutorPostSchema = require('../models/TutorPost/TutorPost');

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

// Get Student Profile and enrolled post
router.get('/student/:id', verify, async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await studentUpdateProfile.aggregate([
      {
        $match: { userId: id.toString() },
      },
      {
        $lookup: {
          from: 'tutorpostschemas',
          localField: 'userId',
          foreignField: 'enrolled',
          as: 'enrolled_post',
        },
      },
      {
        $project: { enrolled_post: { _id: 0, enrolled: 0 } },
      },
    ]);
    res.send({ status: true, data: posts });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

//Search By tutor ID
router.get('/tutor/:id', verify, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await TutorPostSchema.aggregate([
      {
        $match: { tutorId: id.toString() },
      },
      {
        $lookup: {
          from: 'studentupdateprofiles',
          localField: 'enrolled',
          foreignField: 'userId',
          as: 'enrolled_student',
        },
      },
      {
        $project: { enrolled: 0 },
      },
    ]);

    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

module.exports = router;
