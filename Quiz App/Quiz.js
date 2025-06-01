const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Mark Language",
      "High Tech Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which company developed JavaScript?",
    options: [
      "Netscape",
      "Microsoft",
      "Sun Microsystems",
      "IBM"
    ],
    answer: "Netscape"
  },
  {
    question: "What symbol is used for comments in JavaScript?",
    options: [
      "//",
      "/* */",
      "<!-- -->",
      "#"
    ],
    answer: "//"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>", "<link>"],
    answer: "<style>"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<scripting>", "<javascript>", "<script>"],
    answer: "<script>"
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["bgcolor", "color", "background-color", "background"],
    answer: "background-color"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "let", "both var and let"],
    answer: "both var and let"
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
    answer: "alert('Hello World');"
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["style", "class", "font", "styles"],
    answer: "style"
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction()", "def myFunction()", "create myFunction()", "function:myFunction()"],
    answer: "function myFunction()"
  },
  {
    question: "How can you make a numbered list in HTML?",
    options: ["<ul>", "<ol>", "<dl>", "<list>"],
    answer: "<ol>"
  },
  {
    question: "What is the correct syntax to refer to an external script?",
    options: [
      "<script name='xxx.js'>",
      "<script src='xxx.js'>",
      "<script href='xxx.js'>",
      "<script file='xxx.js'>"
    ],
    answer: "<script src='xxx.js'>"
  },
  {
    question: "Which method is used to round a number to the nearest integer in JavaScript?",
    options: ["Math.ceil()", "Math.round()", "Math.floor()", "Math.rnd()"],
    answer: "Math.round()"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Display Object Management",
      "Digital Ordinance Model"
    ],
    answer: "Document Object Model"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const startScreen = document.getElementById("start-screen");
const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("final-score");
const timerEl = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");
const userNameEl = document.getElementById("user-name");

document.getElementById("start-btn").addEventListener("click", () => {
  const name = document.getElementById("username").value.trim();
  if (name === "") {
    alert("Please enter your name!");
    return;
  }
  userNameEl.textContent = `👤 ${name}`;
  startScreen.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  resetState();
  startTimer();
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;

  currentQuiz.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.addEventListener("click", () => selectAnswer(btn, currentQuiz.answer));
    optionsEl.appendChild(btn);
  });

  updateProgress();
}

function resetState() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
}

function selectAnswer(selectedBtn, correctAnswer) {
  clearInterval(timer);
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
    }
  });

  if (selectedBtn.textContent === correctAnswer) score++;
  nextBtn.style.display = "block";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      selectAnswer({ textContent: "" }, quizData[currentQuestion].answer); // auto show answer
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultEl.classList.remove("hidden");
  const name = document.getElementById("username").value.trim();
  finalScoreEl.innerHTML = `<strong>${name}</strong>, your score is <strong>${score}</strong> out of ${quizData.length}.`;
}

function updateProgress() {
  const progress = ((currentQuestion) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}
