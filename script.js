const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const answerButtonElement = document.getElementById('answer-buttons');
const questionElement = document.getElementById('question');
const scoreElement = document.getElementById('right-answers');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0;
    scoreElement.innerText = `Score: ${quizScore}`;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach((button) => {
        const buttonCorrect = button.dataset.correct === 'true';
        setStatusClass(button, buttonCorrect);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        scoreElement.innerText = `Final Score: ${quizScore}`;
    }

    if (correct) {
        quizScore++;
    }
    scoreElement.innerText = `Score: ${quizScore}`;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Django', correct: false },
            { text: 'React', correct: true },
            { text: 'Eclipse', correct: false }
        ],
    },
    {
        question: 'What do we use to define a block of code in Python language?',
        answers: [
            { text: 'key', correct: false },
            { text: 'Brackets', correct: false },
            { text: 'Indentation', correct: true },
            { text: 'None of these', correct: false }
        ],
    },
    {
        question: 'What is the method inside the class in Python language?',
        answers: [
            { text: 'Object', correct: false },
            { text: 'Function', correct: true },
            { text: 'Attribute', correct: false },
            { text: 'Argument', correct: false }
        ],
    },
    {
        question: 'Which of the following is not a keyword in Python language?',
        answers: [
            { text: 'val', correct: true },
            { text: 'raise', correct: false },
            { text: 'try', correct: false },
            { text: 'with', correct: false }
        ],
    },
];
