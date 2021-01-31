const express = require('express');
const router = express.Router();
const verify = require('../verify');
const TutorPostSchema = require('../models/TutorPost/TutorPost');

router.post('/', verify, async (req, res) => {
  try {
    const TutorPost = new TutorPostSchema({
      tutorId: req.body.tutorId,
      subjectName: req.body.subjectName,
      time: req.body.time,
      payment: req.body.payment,
      days: req.body.days,
      note: req.body.note,
    });
    await TutorPost.save();
    res.send({
      status: true,
      statusCode: 200,
      message: 'Post successfully created',
    });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    //const allTutorPost = await TutorPostSchema.find();
    const allTutorPost = await TutorPostSchema.aggregate([
      {
        $lookup: {
          from: 'tutorregisters',
          localField: 'tutorId',
          foreignField: 'profile.userId',
          as: 'tutor_profile',
        },
      },
      {
        $project: {
          _id: 1,
          enrolled: 1,
          tutorId: 1,
          subjectName: 1,
          time: 1,
          payment: 1,
          days: 1,
          note: 1,
          date: 1,
          tutor_profile: { firstName: 1, lastName: 1, profile: 1 },
        },
      },
    ]);

    res.send(allTutorPost);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

router.get('/:tutorId', verify, async (req, res) => {
  try {
    const { tutorId } = req.params;
    const tutorPost = await TutorPostSchema.find({ tutorId: tutorId });
    if (tutorPost) {
      res.send(tutorPost);
    } else {
      res.json({
        status: false,
        statusCode: 404,
        message: 'Tutor post not found with this id',
      });
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

module.exports = router;
