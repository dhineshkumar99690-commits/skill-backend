const express = require('express');
const router = express.Router();
const SkillTest = require('../models/SkillTest');
const { protect } = require('../middleware/authMiddleware');

// @route  GET /api/quizzes
// @desc   Get all available skill tests
router.get('/', async (req, res) => {
  try {
    const tests = await SkillTest.find({}, 'skillName category duration');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/quizzes/:id
// @desc   Get a specific quiz (questions without answers)
router.get('/:id', async (req, res) => {
  try {
    const test = await SkillTest.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Quiz not found' });

    // Return questions without answers
    const safeTest = {
      _id: test._id,
      skillName: test.skillName,
      category: test.category,
      duration: test.duration,
      questions: test.questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options
      }))
    };

    res.json(safeTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  POST /api/quizzes/:id/submit
// @desc   Submit quiz answers and get score
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const test = await SkillTest.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Quiz not found' });

    const { answers } = req.body; // { questionId: selectedAnswer }
    let score = 0;
    const results = [];

    test.questions.forEach(q => {
      const userAnswer = answers[q._id.toString()];
      const isCorrect = userAnswer === q.answer;
      if (isCorrect) score++;
      results.push({
        question: q.question,
        yourAnswer: userAnswer,
        correctAnswer: q.answer,
        isCorrect
      });
    });

    const percentage = Math.round((score / test.questions.length) * 100);

    res.json({
      skillName: test.skillName,
      score,
      total: test.questions.length,
      percentage,
      passed: percentage >= 60,
      results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
