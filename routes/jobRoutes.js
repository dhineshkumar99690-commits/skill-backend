const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const { protect } = require('../middleware/authMiddleware');

// @route  GET /api/jobs
// @desc   Get all jobs (with optional skill filter)
router.get('/', async (req, res) => {
  try {
    const { skill, search } = req.query;
    let filter = {};

    if (skill) {
      filter.requiredSkills = { $in: [new RegExp(skill, 'i')] };
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') }
      ];
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/jobs/:id
// @desc   Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  POST /api/jobs/:id/apply
// @desc   Apply for a job
router.post('/:id/apply', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const alreadyApplied = await Application.findOne({
      user: req.user._id,
      job: req.params.id
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You already applied for this job' });
    }

    const application = await Application.create({
      user: req.user._id,
      job: req.params.id,
      coverLetter: req.body.coverLetter || ''
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/jobs/my/applications
// @desc   Get current user's applications
router.get('/my/applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate('job');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
