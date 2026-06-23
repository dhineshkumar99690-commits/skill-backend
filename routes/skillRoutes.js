const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Job = require('../models/Job');
const Course = require('../models/Course');
const { protect } = require('../middleware/authMiddleware');

// Skill → Job match scoring
const getMatchScore = (userSkills, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return 0;
  const matched = userSkills.filter(s =>
    requiredSkills.some(r => r.toLowerCase().includes(s.toLowerCase()))
  );
  return Math.round((matched.length / requiredSkills.length) * 100);
};

// @route  POST /api/skills/analyze
// @desc   Analyze user skills and match with jobs
router.post('/analyze', protect, async (req, res) => {
  try {
    const { skills } = req.body;

    // Save skills to user profile
    await User.findByIdAndUpdate(req.user._id, { skills });

    // Find matching jobs
    const jobs = await Job.find();
    const matchedJobs = jobs.map(job => ({
      job,
      matchScore: getMatchScore(skills, job.requiredSkills)
    }))
    .filter(item => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

    // Find all required skills across jobs
    const allRequiredSkills = [...new Set(jobs.flatMap(j => j.requiredSkills))];
    const missingSkills = allRequiredSkills.filter(s =>
      !skills.some(us => us.toLowerCase() === s.toLowerCase())
    );

    // Recommend courses for missing skills
    const recommendedCourses = await Course.find({
      skillsCovered: { $in: missingSkills.map(s => new RegExp(s, 'i')) }
    }).limit(4);

    res.json({
      userSkills: skills,
      missingSkills: missingSkills.slice(0, 8),
      matchedJobs,
      recommendedCourses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/skills/gap
// @desc   Get skill gap report for current user
router.get('/gap', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userSkills = user.skills || [];

    const jobs = await Job.find();
    const allRequiredSkills = [...new Set(jobs.flatMap(j => j.requiredSkills))];
    const missingSkills = allRequiredSkills.filter(s =>
      !userSkills.some(us => us.toLowerCase() === s.toLowerCase())
    );

    res.json({
      userSkills,
      missingSkills: missingSkills.slice(0, 10),
      totalJobsAnalyzed: jobs.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
