const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4'); // получили доступ к нашим вариантам ответов  
const optionElements = document.querySelectorAll('.option'); // получили все элементы класса option
const question = document.getElementById('question'); // наш вопрос
const numberOfQuestion = document.getElementById('number-of-question'), // номер текущего вопроса
    numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количество всех вопросов

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страницы 

const answersTracker = document.getElementById('answers-tracker') // обёртка для трекера (кружочки)
const btnNext = document.getElementById('btn-next'); // кнопка 'next'

const overModal = document.querySelector('.quiz-over-modal'); // модальное окно

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), // количество правильных вопросов 
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // количество всех вопросов (в модальном окне) 
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "попробуй снова"
      result = document.getElementById('result'); //Заголовок в конце викторины

const questions = [ // наши вопросы
    {
        question: 'This is _ tree.',
        options: ['the', 'a', 'an', '-'],
        rightAnswer: 1
    },
    {
        question: 'My father is _ doctor.',
        options: ['a', 'an', 'the', '-'],
        rightAnswer: 0
    },
    {
        question: 'My mother is _ economist.',
        options: ['a', 'the', 'an', '-'],
        rightAnswer: 2
    }
];



numberOfAllQuestions.innerHTML = questions.length; // выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question //наш вопрос
    // варианты ответов
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // номер текущей страницы
    indexOfPage++; // увеличение номера страницы
};

let completedAnswers = []; // массив для заданных вопросов


const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки вопросов

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(i => {
                if (i == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }
    else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for (option of optionElements) { //перебор ответов (проверяем по какому ответу кликнул пользователь)
    option.addEventListener('click', el => checkAnswer(el));
}

const disabledOptions = () => {
    optionElements.forEach(i => {
        i.classList.add('disabled');
        if (i.dataset.id == questions[indexOfQuestion].rightAnswer) {
            i.classList.add('correct');
        }
    })
}

const enableOptions = () => { // удаление всех классов 
    optionElements.forEach(i => {
        i.classList.remove('correct', 'wrong', 'disabled');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    }
    else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    overModal.classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
    if (score < 2) {
        result.innerHTML = 'Подучи и попробуй ещё раз';
    } else if (score == questions.length) result.innerHTML = 'Отличный результат!';
    else result.innerHTML = 'Хороший результат!';
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})