const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const verify = require('../verify');
const StudentRegister = require('../models/auth/StudentRegister');
const TutorRegister = require('../models/auth/TutorRegister');
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
      sscExamination,
      sscBoard,
      sscPassingYear,
      sscGroup,
      sscResult,
      hscExamination,
      hscBoard,
      hscGroup,
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
      image,
    } = req.body;

    let profileFields = {};
    profileFields.userId = userId;
    profileFields.ssc = {};
    if (sscExamination) profileFields.ssc.examination = sscExamination;
    if (sscGroup) profileFields.ssc.group = sscGroup;
    if (sscBoard) profileFields.ssc.board = sscBoard;
    if (sscPassingYear) profileFields.ssc.passingYear = sscPassingYear;
    if (sscResult) profileFields.ssc.result = sscResult;
    profileFields.hsc = {};
    if (hscExamination) profileFields.hsc.examination = hscExamination;
    if (hscGroup) profileFields.hsc.group = hscGroup;
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
    if (image) profileFields.image = image;

    const profile = await TutorRegister.findOneAndUpdate(
      { _id: userId.toString() },
      { $set: { profile: profileFields } }
    );
    if (profile) {
      res.json({
        status: true,
        message: 'Profile updated successfully done',
      });
    } else {
      res.json({
        status: false,
        message: "We couldn't find any student in this id",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err?.message });
  }
});

//Student Update Profile
router.put('/student', upload, verify, async (req, res) => {
  try {
    const {
      userId,
      className,
      image,
      presentAddress,
      permanentAddress,
    } = req.body;

    let profileFields = {};
    profileFields.userId = userId;
    if (className) profileFields.className = className;
    if (presentAddress) profileFields.presentAddress = presentAddress;
    if (permanentAddress) profileFields.permanentAddress = permanentAddress;
    if (req.file) profileFields.image = req.file.filename;
    if (image) profileFields.image = image;

    const profile = await StudentRegister.findOneAndUpdate(
      { _id: userId.toString() },
      { $set: { profile: profileFields } },
      { new: true }
    );
    if (profile) {
      res.json({
        status: true,
        message: 'Profile updated successfully done',
      });
    } else {
      res.json({
        status: false,
        message: "We couldn't find any student in this id",
      });
    }
  } catch (err) {
    res.status(400).json({ message: err?.message });
  }
});

module.exports = router;
