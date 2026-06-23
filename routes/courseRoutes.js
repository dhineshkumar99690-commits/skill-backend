const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect } = require('../middleware/authMiddleware');

// @route  GET /api/courses
// @desc   Get all courses (with optional skill filter)
router.get('/', async (req, res) => {
  try {
    const { skill, category, level } = req.query;
    let filter = {};

    if (skill) {
      filter.skillsCovered = { $in: [new RegExp(skill, 'i')] };
    }
    if (category) {
      filter.category = new RegExp(category, 'i');
    }
    if (level) {
      filter.level = level;
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/courses/recommend
// @desc   Get recommended courses based on user's skills
router.get('/recommend', protect, async (req, res) => {
  try {
    const userSkills = req.user.skills || [];

    // Common in-demand skills not covered by user
    const allSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'SQL', 'Machine Learning', 'Data Science', 'AWS', 'Docker'];
    const missingSkills = allSkills.filter(s => !userSkills.includes(s));

    const recommended = await Course.find({
      skillsCovered: { $in: missingSkills.map(s => new RegExp(s, 'i')) }
    }).limit(6);

    res.json(recommended);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/courses/:id
// @desc   Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
