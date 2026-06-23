const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Simple AI-like rule-based chat engine
const getAIResponse = (message, userSkills = []) => {
  const msg = message.toLowerCase();

  if (msg.includes('resume') || msg.includes('cv')) {
    return `📄 **Resume Tips:**\n\n1. Keep your resume to 1-2 pages\n2. Use action verbs (Built, Developed, Led)\n3. Highlight your skills: ${userSkills.length > 0 ? userSkills.join(', ') : 'add your skills in your profile'}\n4. Include measurable achievements\n5. Tailor it for each job application`;
  }

  if (msg.includes('skill') || msg.includes('learn')) {
    const skills = userSkills.length > 0 ? userSkills.join(', ') : 'None added yet';
    return `🎯 **Your Skills:** ${skills}\n\nTo improve your job prospects, consider learning:\n- **JavaScript / Python** – Most in-demand\n- **React / Node.js** – Full-stack development\n- **SQL / MongoDB** – Data management\n- **Cloud (AWS/Azure)** – High salary potential\n\nVisit the **Courses** section for learning resources!`;
  }

  if (msg.includes('job') || msg.includes('career') || msg.includes('apply')) {
    return `💼 **Career Guidance:**\n\n1. Update your profile with all your skills\n2. Use the **Skill Match** feature to find relevant jobs\n3. Browse the **Jobs** section to apply\n4. Track your applications in real-time\n\nTip: Applying to jobs where you match 70%+ of requirements increases your success rate!`;
  }

  if (msg.includes('interview') || msg.includes('prepare')) {
    return `🎤 **Interview Preparation Tips:**\n\n1. **Technical Round:** Practice coding on LeetCode/HackerRank\n2. **HR Round:** Prepare for "Tell me about yourself"\n3. **Research** the company before interview\n4. **STAR method** – Situation, Task, Action, Result\n5. Practice with our **Skill Check** quizzes!`;
  }

  if (msg.includes('salary') || msg.includes('package')) {
    return `💰 **Salary Insights:**\n\n- **Junior Developer:** ₹3–6 LPA\n- **Mid-level Developer:** ₹6–12 LPA\n- **Senior Developer:** ₹12–25 LPA\n- **Data Scientist:** ₹8–20 LPA\n- **ML Engineer:** ₹10–30 LPA\n\nLearn high-demand skills to increase your earning potential!`;
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `👋 **Hello! I'm SkillDK AI Assistant**\n\nI can help you with:\n- 📄 Resume tips\n- 🎯 Skill recommendations\n- 💼 Career guidance\n- 🎤 Interview preparation\n- 💰 Salary insights\n\nWhat would you like to know?`;
  }

  if (msg.includes('course') || msg.includes('tutorial')) {
    return `📚 **Learning Recommendations:**\n\nBased on market demand, here are top learning paths:\n\n1. **Web Development** → HTML, CSS, JS, React\n2. **Backend Dev** → Node.js, Python, Java\n3. **Data Science** → Python, Pandas, ML\n4. **DevOps** → Docker, Kubernetes, CI/CD\n\nCheck the **Courses** section for free resources!`;
  }

  return `🤖 I understand you're asking about: **"${message}"**\n\nI can help with:\n- Skills & learning paths\n- Resume & CV tips\n- Job application guidance\n- Interview preparation\n- Career advice\n\nTry asking something like: *"How do I improve my resume?"* or *"What skills should I learn?"*`;
};

// @route  POST /api/chat
// @desc   Send message to AI chat
router.post('/', protect, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message is required' });
    }

    const userSkills = req.user.skills || [];
    const response = getAIResponse(message, userSkills);

    res.json({
      userMessage: message,
      aiResponse: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
