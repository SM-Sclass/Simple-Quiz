const questions = [
    {
      question: "When was Albert Einstein born?",
      answers: [
        { text: "March 1877", correct: false },
        { text: "March 1879", correct: true },
        { text: "March 1876", correct: false },
        { text: "March 1875", correct: false },
      ],
    },
    {
      question:
        "Where was he born?",
      answers: [
        { text: "Germany", correct: true },
        { text: "Italy", correct: false },
        { text: "Japan", correct: false },
        { text: "SriLanka", correct: false },
      ],
    },
    {
      question:
        "When did he die?",
      answers: [
        { text: "April 1977", correct: false },
        { text: "April 1975", correct: false },
        { text: "April 1957", correct: false },
        { text: "April 1955", correct: true },
      ],
    },
    {
      question:
        "When was ALbert Einstein Awarded the Nobel Prize in Physics?",
      answers: [
        { text: "1921", correct: true },
        {
          text: "1922",
          correct: true,
        },
        { text: "1915", correct: false },
        { text: "1926", correct: false },
      ],
    },
    {
      question:
        "Which of the following is NOT one of the four fundamental forces that Einstein tried to unify in a single theory?",
      answers: [
        { text: "Gravity", correct: false },
        {
          text: "Electromagnetism",
          correct: false,
        },
        { text: "Weak nuclear force", correct: false },
        { text: "Strong nuclear force", correct: true },
      ],
    },
    {
      question:
        "What is the name of paradox Einstein formulated about the concept of simultaneity?",
      answers: [
        { text: "Schrodinger's cat", correct: false },
        {
          text: "The EPR paradox",
          correct: true,
        },
        { text: "The twin paradox", correct: false },
        { text: "The uncertainty principle", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
  
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
  
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
  
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  startQuiz();