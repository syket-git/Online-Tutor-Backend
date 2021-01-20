const express = require('express');
const router = express.Router();
const StudentRegister = require('../models/auth/StudentRegister');
const TutorRegister = require('../models/auth/TutorRegister');
const { signupValidation, signinValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    if (req.body.token && req.body.people) {
      const user = jwt.verify(req.body.token, process.env.TOKEN_SECRET);
      const { _id } = user;
      if (req.body.people === 'student') {
        const user = await StudentRegister.findById(_id).select('-password');
        if (!user) return res.status(404).json('User not found');
        res.status(200).json(user);
      } else if (req.body.people === 'tutor') {
        const user = await TutorRegister.findById(_id).select('-password');
        if (!user) return res.status(404).json('User not found');
        res.status(200).json(user);
      }
    }
    res.status(400).json('Access Denied');
  } catch (err) {
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

//Student Register
router.post('/student/register', async (req, res) => {
  try {
    const { error } = await signupValidation(req.body);
    if (error) return res.status(422).json(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const Signup = new StudentRegister({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      password: hashPassword,
    });

    const existEmail = await StudentRegister.findOne({ email: req.body.email });
    if (existEmail) return res.status(409).json('Email already exist');

    await Signup.save();
    res.json({ status: true, message: 'Register successfully done' });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

//Tutor Register
router.post('/tutor/register', async (req, res) => {
  try {
    const { error } = await signupValidation(req.body);
    if (error) return res.status(422).json(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const Signup = new TutorRegister({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      password: hashPassword,
    });

    const existEmail = await TutorRegister.findOne({ email: req.body.email });
    if (existEmail) return res.status(409).json('Email already exist');

    await Signup.save();
    res.json({ status: true, message: 'Register successfully done' });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

//Student Login
router.post('/student/login', async (req, res) => {
  try {
    const { error } = await signinValidation(req.body);
    if (error) return res.status(400).json(error?.details[0].message);

    const user = await StudentRegister.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Invalid Email or password');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json('Invalid email or password');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('token', token).send({
      success: true,
      message: 'Login successfully done',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        token: token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

//Tutor Login
router.post('/tutor/login', async (req, res) => {
  try {
    const { error } = await signinValidation(req.body);
    if (error) return res.status(400).json(error?.details[0].message);

    const user = await TutorRegister.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Invalid Email or password');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json('Invalid email or password');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('token', token).send({
      success: true,
      message: 'Login successfully done',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        token: token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

module.exports = router;
