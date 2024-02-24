const quiz = time => {
  return {
    id: 1,
    time: time,
    questions: [
      {
        id: 1,
        question: 'What is React?',
        options: [
          'A JavaScript library for building user interfaces',
          'A JavaScript framework for building user interfaces',
          'A JavaScript library for building front-end applications',
          'A JavaScript framework for building front-end applications',
        ],
        answer: 'A JavaScript library for building user interfaces',
        explanation:
          'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.',
        attempted: '',
      },
      {
        id: 2,
        question: 'What is Node.js?',
        options: [
          'A front-end framework for building web applications',
          'A runtime environment for executing JavaScript on the server-side',
          'A database management system',
          'A browser-based development tool',
        ],
        answer:
          'A runtime environment for executing JavaScript on the server-side',
        explanation:
          'Node.js is a runtime environment that allows you to execute JavaScript on the server-side. It is often used for building server applications and networking applications.',
        attempted: '',
      },
      {
        id: 3,
        question: 'What does HTML stand for?',
        options: [
          'Hyper Transfer Markup Language',
          'Hyper Text Makeup Language',
          'Hyper Text Markup Language',
          'Highly Technical Markup Language',
        ],
        answer: 'Hyper Text Markup Language',
        explanation:
          'HTML stands for Hyper Text Markup Language. It is the standard markup language used to create web pages and structure content on the World Wide Web.',
        attempted: '',
      },
    ],
    isAttempted: false,
  }
}

const quiz1 = quiz('1:15')
const quiz2 = quiz('2:05')

const course = {
  isRegistered: false,
  title: 'React Training: Advanced React.js',
  description: 'Take your React skills to the next level',
  thumbnail: 'https://i.ibb.co/z4vcz6g/reactjs.png',
  modules: [
    {
      id: 0,
      title: 'Introduction to React.js',
      description:
        'Understanding the role of React in modern web development.\nSetting up your development environment.\nCreating your first React application.',
      type: 'video', // video, quiz, notes
      videoUrl: 'https://www.youtube.com/watch?v=MIfMGkn4eE0',
      quizzes: [quiz1, quiz2],
      isCompleted: false,
    },
    {
      id: 1,
      title: 'React Basics',
      description:
        'JSX (JavaScript XML) and its significance.\nComponents and the component-based architecture.\nState and props: Managing data and properties.',
      type: 'notes',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Meow Meow React.js',
      description:
        'Understanding the role of React in modern web development.\nSetting up your development environment.\nCreating your first React application.',
      type: 'quiz', // video, quiz, notes
      quiz: quiz1,
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Node React.js',
      description:
        'Understanding the role of React in modern web development.\nSetting up your development environment.\nCreating your first React application.',
      type: 'video', // video, quiz, notes
      videoUrl: 'https://www.youtube.com/watch?v=MIfMGkn4eE0',
      quizzes: [quiz, quiz],
      isCompleted: false,
    },
  ],
  learnings:
    'Welcome to our Comprehensive React.js Development Course, designed to equip you with the essential skills and knowledge to become a proficient React.js developer.\n Whether you are a beginner in web development or looking to enhance your JavaScript and front-end development skills, this course is tailored to provide you with a solid foundation and practical experience in React.js. \nIn this course, you will learn the core concepts of React.js, a popular JavaScript library for building dynamic, interactive, and efficient user interfaces. React is widely used in modern web development, making it a valuable skill for both front-end developers and full-stack developers.',
}

export { course, quiz }
