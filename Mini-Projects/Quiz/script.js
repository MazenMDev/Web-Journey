const timeLeft = document.querySelector(".time-left");
const page = document.querySelector(".page");
const nextBtn = document.querySelector(".next");

// Content Selection
const headQuestion = document.querySelector("h1");
const answers = document.querySelectorAll(".box");
const head = document.querySelector(".head");
const content = document.querySelector(".content");
const tail = document.querySelector(".tail");

const falseIcon = `<img class="false-icon" src="img/stop.png" alt="Incorrect">`;
const trueIcon = `<img class="true-icon" src="img/check.png" alt="Correct">`;

let counter = 0;
let timer = 15;
let countCorrectAnswers = 0;
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    answer: 0,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "Python"],
    answer: 2,
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Vue", "Angular", "Django"],
    answer: 3,
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: 1,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Google", "Microsoft", "Oracle"],
    answer: 0,
  },
];

nextBtn.style.display = "none";

const time = setInterval(() => {
  timeLeft.innerHTML = timer;
  if (timer <= 0) {
    clearInterval(time);
    displayResults();
    return;
  }
  timer--;
}, 1000);

nextBtn.addEventListener("click", () => {
  if (counter === questions.length - 1) return;

  counter++;
  page.innerHTML = counter + 1;
  resetUI();
  renderNextQuestion();
});

answers.forEach((answer) => {
  answer.addEventListener("click", () => {
    displayResults(answer);
  });
});

function renderNextQuestion() {
  const currentQuestion = questions[counter];
  console.log(currentQuestion.question);
  headQuestion.innerHTML = currentQuestion.question;
  answers.forEach((answer, indx) => {
    console.log("answer", answer);
    answer.textContent = currentQuestion.options[indx];
  });
}
renderNextQuestion();

function displayResults(clicked) {
  clearInterval(time);
  nextBtn.style.display = "block";
  const currentQuestion = questions[counter];
  let isCorrect = false;
  answers.forEach((answer, i) => {
    if (i === currentQuestion.answer && !answer.classList.contains("correct")) {
      answer.classList.add("correct");
      answer.innerHTML += trueIcon;
      if (answer === clicked) {
        isCorrect = true;
        countCorrectAnswers++;
      }
    }
  });
  if (counter === questions.length - 1) displayScore();
  if (!isCorrect) {
    clicked.classList.add("false");
    clicked.innerHTML += falseIcon;
  }
}

function displayScore() {
  nextBtn.innerHTML = "Show Results";
  nextBtn.addEventListener("click", () => {
    head.style.display = "none";
    content.style.display = "none";
    tail.style.display = "none";
    const result = document.querySelector(".result");
    result.style.display = "block";
    result.innerHTML = `
    <h2>Congratulations!</h2>
    <p>Your score: ${countCorrectAnswers}/5</p>
    `;
  });
}

function resetUI() {
  timer = 15;
  timeLeft.innerHTML = timer;
  nextBtn.style.display = "none";

  answers.forEach((answer) => {
    answer.classList.remove("correct");
    answer.classList.remove("false");
  });
}
