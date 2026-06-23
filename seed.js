const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Job = require('./models/Job');
const Course = require('./models/Course');
const SkillTest = require('./models/SkillTest');

const jobs = [
  {
    title: 'Frontend Developer',
    company: 'TechCorp India',
    location: 'Chennai, Tamil Nadu',
    description: 'Build responsive UIs using React and modern CSS frameworks.',
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
    salary: '₹6–10 LPA',
    type: 'Full-time'
  },
  {
    title: 'Backend Developer',
    company: 'Infosys',
    location: 'Bangalore',
    description: 'Develop REST APIs using Node.js and manage MongoDB databases.',
    requiredSkills: ['Node.js', 'MongoDB', 'Express', 'JavaScript', 'REST API'],
    salary: '₹7–12 LPA',
    type: 'Full-time'
  },
  {
    title: 'Data Scientist',
    company: 'Analytics Co.',
    location: 'Hyderabad',
    description: 'Analyze large datasets and build predictive ML models.',
    requiredSkills: ['Python', 'Machine Learning', 'Pandas', 'SQL', 'TensorFlow'],
    salary: '₹10–18 LPA',
    type: 'Full-time'
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    description: 'Work on both frontend and backend of our SaaS product.',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Docker'],
    salary: '₹8–15 LPA',
    type: 'Full-time'
  },
  {
    title: 'Python Developer',
    company: 'AI Solutions Ltd',
    location: 'Coimbatore',
    description: 'Build automation tools and AI integrations using Python.',
    requiredSkills: ['Python', 'Django', 'REST API', 'SQL', 'Git'],
    salary: '₹5–9 LPA',
    type: 'Full-time'
  },
  {
    title: 'React Native Developer',
    company: 'MobileFirst',
    location: 'Pune',
    description: 'Build cross-platform mobile apps for iOS and Android.',
    requiredSkills: ['React Native', 'JavaScript', 'Redux', 'REST API'],
    salary: '₹7–13 LPA',
    type: 'Full-time'
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudBase Inc.',
    location: 'Remote',
    description: 'Manage CI/CD pipelines and cloud infrastructure.',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Git'],
    salary: '₹10–20 LPA',
    type: 'Full-time'
  },
  {
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    location: 'Mumbai',
    description: 'Design beautiful and intuitive user interfaces for web apps.',
    requiredSkills: ['Figma', 'Adobe XD', 'HTML', 'CSS', 'User Research'],
    salary: '₹5–10 LPA',
    type: 'Full-time'
  }
];

const courses = [
  {
    title: 'Complete React Developer Course',
    description: 'Master React.js from basics to advanced with hooks, Redux, and projects.',
    category: 'Web Development',
    platform: 'Udemy',
    url: 'https://www.udemy.com',
    skillsCovered: ['React', 'JavaScript', 'Redux', 'HTML', 'CSS'],
    duration: '40 hours',
    level: 'Intermediate'
  },
  {
    title: 'Node.js & Express.js Masterclass',
    description: 'Build scalable REST APIs using Node.js and Express with MongoDB.',
    category: 'Backend Development',
    platform: 'Coursera',
    url: 'https://www.coursera.org',
    skillsCovered: ['Node.js', 'Express', 'MongoDB', 'REST API', 'JavaScript'],
    duration: '35 hours',
    level: 'Intermediate'
  },
  {
    title: 'Python for Data Science',
    description: 'Learn Python fundamentals and data science with Pandas, NumPy, and Matplotlib.',
    category: 'Data Science',
    platform: 'edX',
    url: 'https://www.edx.org',
    skillsCovered: ['Python', 'Pandas', 'NumPy', 'Data Science', 'Matplotlib'],
    duration: '50 hours',
    level: 'Beginner'
  },
  {
    title: 'Machine Learning A-Z',
    description: 'Complete ML course with hands-on projects using scikit-learn and TensorFlow.',
    category: 'Machine Learning',
    platform: 'Udemy',
    url: 'https://www.udemy.com',
    skillsCovered: ['Machine Learning', 'Python', 'TensorFlow', 'scikit-learn'],
    duration: '60 hours',
    level: 'Intermediate'
  },
  {
    title: 'AWS Cloud Practitioner',
    description: 'Get started with AWS cloud services and pass the certification exam.',
    category: 'Cloud Computing',
    platform: 'AWS Training',
    url: 'https://aws.amazon.com/training',
    skillsCovered: ['AWS', 'Cloud Computing', 'DevOps'],
    duration: '25 hours',
    level: 'Beginner'
  },
  {
    title: 'Docker & Kubernetes for Developers',
    description: 'Containerize applications and manage them with Kubernetes.',
    category: 'DevOps',
    platform: 'Pluralsight',
    url: 'https://www.pluralsight.com',
    skillsCovered: ['Docker', 'Kubernetes', 'DevOps', 'Linux'],
    duration: '30 hours',
    level: 'Intermediate'
  },
  {
    title: 'Full Stack JavaScript Development',
    description: 'Build complete web apps from scratch with React, Node, and MongoDB.',
    category: 'Full Stack',
    platform: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org',
    skillsCovered: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML', 'CSS'],
    duration: '80 hours',
    level: 'Beginner'
  },
  {
    title: 'SQL & Database Design',
    description: 'Master SQL queries, joins, and relational database design.',
    category: 'Database',
    platform: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    skillsCovered: ['SQL', 'Database', 'MySQL', 'PostgreSQL'],
    duration: '20 hours',
    level: 'Beginner'
  }
];

const quizzes = [
  {
    skillName: 'JavaScript',
    category: 'Web Development',
    duration: 10,
    questions: [
      {
        question: 'Which keyword is used to declare a variable in modern JavaScript?',
        options: ['var', 'let', 'int', 'string'],
        answer: 'let'
      },
      {
        question: 'What does "=== " mean in JavaScript?',
        options: ['Assignment', 'Loose equality', 'Strict equality', 'Not equal'],
        answer: 'Strict equality'
      },
      {
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        answer: 'push()'
      },
      {
        question: 'What is the output of typeof null?',
        options: ['null', 'undefined', 'object', 'string'],
        answer: 'object'
      },
      {
        question: 'Which of the following is NOT a JavaScript data type?',
        options: ['Boolean', 'Float', 'Symbol', 'BigInt'],
        answer: 'Float'
      }
    ]
  },
  {
    skillName: 'Python',
    category: 'Programming',
    duration: 10,
    questions: [
      {
        question: 'How do you create a list in Python?',
        options: ['{}', '[]', '()', '<>'],
        answer: '[]'
      },
      {
        question: 'What is the correct way to define a function in Python?',
        options: ['function myFunc():', 'def myFunc():', 'func myFunc():', 'define myFunc():'],
        answer: 'def myFunc():'
      },
      {
        question: 'Which keyword is used for loops in Python?',
        options: ['loop', 'for', 'each', 'iterate'],
        answer: 'for'
      },
      {
        question: 'What does len() function do?',
        options: ['Returns length', 'Deletes list', 'Sorts array', 'Creates list'],
        answer: 'Returns length'
      },
      {
        question: 'Which symbol is used for comments in Python?',
        options: ['//', '#', '/*', '--'],
        answer: '#'
      }
    ]
  },
  {
    skillName: 'React',
    category: 'Frontend Development',
    duration: 10,
    questions: [
      {
        question: 'What is JSX?',
        options: ['A database', 'JavaScript XML syntax extension', 'A CSS framework', 'A Node package'],
        answer: 'JavaScript XML syntax extension'
      },
      {
        question: 'Which hook is used for state management in React?',
        options: ['useEffect', 'useState', 'useContext', 'useRef'],
        answer: 'useState'
      },
      {
        question: 'What is the correct way to pass data to a child component?',
        options: ['state', 'props', 'context', 'ref'],
        answer: 'props'
      },
      {
        question: 'Which hook runs side effects in React?',
        options: ['useState', 'useEffect', 'useCallback', 'useMemo'],
        answer: 'useEffect'
      },
      {
        question: 'What does the virtual DOM do?',
        options: ['Directly updates HTML', 'Compares and updates only changed parts', 'Stores data', 'Handles routing'],
        answer: 'Compares and updates only changed parts'
      }
    ]
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await Job.deleteMany({});
    await Course.deleteMany({});
    await SkillTest.deleteMany({});

    // Insert new data
    await Job.insertMany(jobs);
    await Course.insertMany(courses);
    await SkillTest.insertMany(quizzes);

    console.log('✅ Sample data seeded successfully!');
    console.log(`  → ${jobs.length} Jobs`);
    console.log(`  → ${courses.length} Courses`);
    console.log(`  → ${quizzes.length} Quizzes`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedData();
