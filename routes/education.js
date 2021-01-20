const express = require('express');
const {
  sscLevelValidation,
  hscLevelValidation,
  boardValidation,
  groupValidation,
  universityValidation,
} = require('../validation');
const SSCLevelSchema = require('../models/education/ssc');
const HSCLevelSchema = require('../models/education/hsc');
const BoardSchema = require('../models/education/board');
const GroupSchema = require('../models/education/group');
const YearSchema = require('../models/education/years');
const UniversitySchema = require('../models/education/university');
const MasterSchema = require('../models/education/master');
const GraduationSchema = require('../models/education/graduation');
const verify = require('../verify');

const router = express.Router();

//SSC or Equivalent ADD

router.post('/ssc-level', verify, async (req, res) => {
  try {
    const { error } = await sscLevelValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const AddSSCLevel = new SSCLevelSchema({
      ssc_level: req.body.ssc_level,
    });

    const savedSSCLevel = await AddSSCLevel.save();
    res.send(savedSSCLevel);
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
});

//SSC or Equivalent GET

router.get('/ssc-level', verify, async (req, res) => {
  try {
    const allSSCLevel = await SSCLevelSchema.find();
    res.send(allSSCLevel);
  } catch (error) {
    return res.json({ message: error?.message });
  }
});

//HSC or Equivalent ADD

router.post('/hsc-level', verify, async (req, res) => {
  try {
    const { error } = await hscLevelValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const AddHSCLevel = new HSCLevelSchema({
      hsc_level: req.body.hsc_level,
    });

    const savedHSCLevel = await AddHSCLevel.save();
    res.send(savedHSCLevel);
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
});

//HSC or Equivalent GET

router.get('/hsc-level', verify, async (req, res) => {
  try {
    const allHSCLevel = await HSCLevelSchema.find();
    res.send(allHSCLevel);
  } catch (error) {
    return res.json({ message: error?.message });
  }
});

//Boards ADD

router.post('/boards', verify, async (req, res) => {
  try {
    const { error } = await boardValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const addBoardSchema = new BoardSchema({
      board_name: req.body.board_name,
    });

    const savedBoardSchema = await addBoardSchema.save();
    res.send(savedBoardSchema);
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
});

//Boards GET

router.get('/boards', verify, async (req, res) => {
  try {
    const allBoards = await BoardSchema.find();
    res.send(allBoards);
  } catch (error) {
    return res.json({ message: error?.message });
  }
});

//Groups ADD

router.post('/groups', verify, async (req, res) => {
  try {
    const { error } = await groupValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const addGroupSchema = new GroupSchema({
      group_name: req.body.group_name,
    });

    const savedGroupSchema = await addGroupSchema.save();
    res.send(savedGroupSchema);
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
});

//Groups GET

router.get('/groups', verify, async (req, res) => {
  try {
    const allGroups = await GroupSchema.find();
    res.send(allGroups);
  } catch (error) {
    return res.json({ message: error?.message });
  }
});

//University ADD

router.post('/university', verify, async (req, res) => {
  try {
    const { error } = await universityValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const addUniversitySchema = new UniversitySchema({
      university_name: req.body.university_name,
    });

    const savedUniversitySchema = await addUniversitySchema.save();
    res.send(savedUniversitySchema);
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
});

//University GET

router.get('/university', verify, async (req, res) => {
  try {
    const allUniversity = await UniversitySchema.find();
    res.send(allUniversity);
  } catch (error) {
    return res.json({ message: error?.message });
  }
});

//Year
router.get('/years', verify, async (req, res) => {
  try {
    const allYears = await YearSchema.find();
    res.send(allYears);
  } catch (error) {
    return res.json({ message: error?.message });
  }
});

//Graduation
router.get('/graduation-degree', verify, async (req, res) => {
  try {
    const graduation = await GraduationSchema.find();
    res.send(graduation);
  } catch (error) {
    return res.json({ message: error?.message });
  }
});

//Master
router.get('/master-degree', verify, async (req, res) => {
  try {
    const master = await MasterSchema.find();
    res.send(master);
  } catch (error) {
    return res.json({ message: error?.message });
  }
});

module.exports = router;
