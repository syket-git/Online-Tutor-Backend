const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const verify = require('../verify');
const tutorUpdateProfile = require('../models/UpdateProfile/TutorUpdateProfile');
const studentUpdateProfile = require('../models/UpdateProfile/StudentUpdateProfile');

//Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    return cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

//Init Upload
const upload = multer({
  storage: storage,
}).single('image');

//Tutor Update Profile
router.put('/tutor', upload, verify, async (req, res) => {
  try {
    const {
      userId,
      email,
      sscExamination,
      sscBoard,
      sscPassingYear,
      sscResult,
      hscExamination,
      hscBoard,
      hscPassingYear,
      hscResult,
      graduationDegree,
      graduationSubject,
      graduationBoard,
      graduationPassingYear,
      graduationResult,
      masterDegree,
      masterSubject,
      masterBoard,
      masterPassingYear,
      masterResult,
      speciality,
      presentAddress,
      permanentAddress,
    } = req.body;

    let profileFields = {};
    profileFields.userId = userId;
    profileFields.email = email;
    profileFields.ssc = {};
    if (sscExamination) profileFields.ssc.examination = sscExamination;
    if (sscBoard) profileFields.ssc.board = sscBoard;
    if (sscPassingYear) profileFields.ssc.passingYear = sscPassingYear;
    if (sscResult) profileFields.ssc.result = sscResult;
    profileFields.hsc = {};
    if (hscExamination) profileFields.hsc.examination = hscExamination;
    if (hscBoard) profileFields.hsc.board = hscBoard;
    if (hscPassingYear) profileFields.hsc.passingYear = hscPassingYear;
    if (hscResult) profileFields.hsc.result = hscResult;
    profileFields.graduation = {};
    if (graduationDegree) profileFields.graduation.degree = graduationDegree;
    if (graduationSubject) profileFields.graduation.subject = graduationSubject;
    if (graduationBoard) profileFields.graduation.board = graduationBoard;
    if (graduationPassingYear)
      profileFields.graduation.passingYear = graduationPassingYear;
    if (graduationResult) profileFields.graduation.result = graduationResult;
    profileFields.master = {};
    if (masterDegree) profileFields.master.degree = masterDegree;
    if (masterSubject) profileFields.master.subject = masterSubject;
    if (masterBoard) profileFields.master.board = masterBoard;
    if (masterPassingYear) profileFields.master.passingYear = masterPassingYear;
    if (masterResult) profileFields.master.result = masterResult;
    if (speciality) profileFields.speciality = speciality;
    if (presentAddress) profileFields.presentAddress = presentAddress;
    if (permanentAddress) profileFields.permanentAddress = permanentAddress;
    if (req.file) profileFields.image = req.file.filename;

    let tutorProfile = await tutorUpdateProfile.findOne({
      userId: userId.toString(),
    });
    if (tutorProfile) {
      tutorProfile = await tutorUpdateProfile.findOneAndUpdate(
        { userId: userId },
        { $set: profileFields },
        { new: true }
      );
      return res.json({
        status: true,
        message: 'Profile updated successfully done',
      });
    }

    const TutorProfileUpdate = new tutorUpdateProfile(profileFields);
    await TutorProfileUpdate.save();
    res.json({
      status: true,
      message: 'Profile updated successfully done',
    });
  } catch (err) {
    res.status(400).json({ message: err?.message });
  }
});

//Student Update Profile
router.put('/student', upload, verify, async (req, res) => {
  try {
    const {
      userId,
      email,
      className,
      presentAddress,
      permanentAddress,
    } = req.body;

    let profileFields = {};
    profileFields.userId = userId;
    profileFields.email = email;
    if (className) profileFields.className = className;
    if (presentAddress) profileFields.presentAddress = presentAddress;
    if (permanentAddress) profileFields.permanentAddress = permanentAddress;
    if (req.file) profileFields.image = req.file.filename;

    let studentProfile = await studentUpdateProfile.findOne({
      userId: userId.toString(),
    });
    if (studentProfile) {
      studentProfile = await studentUpdateProfile.findOneAndUpdate(
        { userId: userId },
        { $set: profileFields },
        { new: true }
      );
      return res.json({
        status: true,
        message: 'Profile updated successfully done',
      });
    }

    const StudentProfileUpdate = new studentUpdateProfile(profileFields);
    await StudentProfileUpdate.save();
    res.json({
      status: true,
      message: 'Profile updated successfully done',
    });
  } catch (err) {
    res.status(400).json({ message: err?.message });
  }
});

module.exports = router;
