// Shooting star animation for quiz page
document.addEventListener('DOMContentLoaded', () => {
    function createShootingStars() {
        const body = document.body;
        
        const existingStars = document.querySelectorAll('.shooting-star');
        existingStars.forEach(star => star.remove());
        
        const starCount = 4 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            const angle = 215 + (Math.random() * 30 - 15);
            star.style.setProperty('--angle', `${angle}deg`);
            
            body.appendChild(star);
        }
        
        setTimeout(createShootingStars, 13000);
    }
    
    createShootingStars();

    // Quiz functionality
    const quizData = [
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1,
            explanation: "Mars is called the Red Planet because of its reddish appearance due to iron oxide (rust) on its surface."
        },
        {
            question: "What is the name of the galaxy that contains our Solar System?",
            options: ["Andromeda", "Whirlpool", "Milky Way", "Sombrero"],
            correct: 2,
            explanation: "Our Solar System is located in the Milky Way galaxy, a barred spiral galaxy containing billions of stars."
        },
        {
            question: "Which planet has the most prominent ring system?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correct: 1,
            explanation: "Saturn has the most extensive and visible ring system made mostly of ice particles with some rock debris."
        },
        {
            question: "What is the closest star to Earth?",
            options: ["Proxima Centauri", "Sirius", "Alpha Centauri", "The Sun"],
            correct: 3,
            explanation: "The Sun is the closest star to Earth, located about 150 million kilometers away."
        },
        {
            question: "Which year did humans first land on the Moon?",
            options: ["1965", "1969", "1972", "1958"],
            correct: 1,
            explanation: "Apollo 11 successfully landed humans on the Moon on July 20, 1969."
        },
        {
            question: "What is the largest planet in our Solar System?",
            options: ["Saturn", "Jupiter", "Neptune", "Earth"],
            correct: 1,
            explanation: "Jupiter is the largest planet in our Solar System, with a mass more than twice that of all other planets combined."
        },
        {
            question: "Which spacecraft was the first to reach interstellar space?",
            options: ["Voyager 1", "Voyager 2", "Pioneer 10", "New Horizons"],
            correct: 0,
            explanation: "Voyager 1 entered interstellar space in August 2012, becoming the first human-made object to do so."
        },
        {
            question: "What causes the phases of the Moon?",
            options: [
                "Earth's shadow on the Moon",
                "The Moon's rotation",
                "The relative positions of Earth, Moon, and Sun",
                "The Moon's distance from Earth"
            ],
            correct: 2,
            explanation: "Moon phases are caused by the changing relative positions of the Earth, Moon, and Sun as the Moon orbits Earth."
        },
        {
            question: "Which planet has the longest day (rotation period)?",
            options: ["Venus", "Mercury", "Jupiter", "Mars"],
            correct: 0,
            explanation: "Venus has the longest day, taking about 243 Earth days to complete one rotation."
        },
        {
            question: "What is a light-year?",
            options: [
                "The time it takes light to travel from Sun to Earth",
                "The distance light travels in one year",
                "The brightness of a star",
                "The age of light from distant stars"
            ],
            correct: 1,
            explanation: "A light-year is a unit of distance, not time. It's the distance that light travels in one year - about 9.46 trillion kilometers."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = new Array(quizData.length).fill(null);

    const quizContent = document.getElementById('quiz-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const questionCounter = document.getElementById('question-counter');
    const scoreDisplay = document.getElementById('score-display');
    const progressBar = document.getElementById('progress');

    // Sembunyikan score display selama kuis
    scoreDisplay.style.display = 'none';

    function updateProgress() {
        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;
        questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    }

    function showQuestion() {
        const question = quizData[currentQuestion];
        let optionsHtml = '';

        question.options.forEach((option, index) => {
            const isSelected = userAnswers[currentQuestion] === index;
            const optionClass = isSelected ? 'option selected' : 'option';
            optionsHtml += `
                <div class="${optionClass}" onclick="selectOption(${index})">
                    ${String.fromCharCode(65 + index)}. ${option}
                </div>
            `;
        });

        quizContent.innerHTML = `
            <div class="question-container">
                <div class="question-number">Question ${currentQuestion + 1}</div>
                <div class="question-text">${question.question}</div>
                <div class="options-container">
                    ${optionsHtml}
                </div>
            </div>
        `;

        updateProgress();
        updateButtons();
    }

    function selectOption(optionIndex) {
        userAnswers[currentQuestion] = optionIndex;
        showQuestion();
    }

    function updateButtons() {
        prevBtn.disabled = currentQuestion === 0;
        
        if (currentQuestion === quizData.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    function nextQuestion() {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            showQuestion();
        }
    }

    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }

    function calculateScore() {
        score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizData[index].correct) {
                score++;
            }
        });
        return score;
    }

    function showResults() {
        calculateScore();
        
        let resultsHtml = `
            <div class="results-container">
                <h2>Quiz Completed!</h2>
                <div class="score-display">${score}/${quizData.length}</div>
                <div class="score-message">
        `;

        if (score === quizData.length) {
            resultsHtml += `Perfect! You're a space expert! 🚀`;
        } else if (score >= quizData.length * 0.7) {
            resultsHtml += `Great job! You know your space facts! ✨`;
        } else if (score >= quizData.length * 0.5) {
            resultsHtml += `Good effort! Keep learning about space! 🌟`;
        } else {
            resultsHtml += `Nice try! The universe is full of wonders to discover! 🌌`;
        }

        resultsHtml += `</div>`;

        // Add answer review section
        resultsHtml += `<div class="answers-review" style="margin-top: 30px; text-align: left;">`;
        resultsHtml += `<h3 style="color: #7aa2f7; margin-bottom: 20px; text-align: center;">Review Your Answers:</h3>`;
        
        quizData.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            const answerClass = isCorrect ? 'correct' : 'incorrect';
            
            resultsHtml += `
                <div class="review-item" style="margin-bottom: 25px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 4px solid ${isCorrect ? '#4CAF50' : '#F44336'}">
                    <div style="font-weight: bold; margin-bottom: 8px;">${index + 1}. ${question.question}</div>
                    <div style="margin-bottom: 5px;">
                        <span style="color: ${isCorrect ? '#4CAF50' : '#F44336'}">Your answer: </span>
                        ${userAnswer !== null ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}` : 'Not answered'}
                        ${isCorrect ? ' ✓' : ' ✗'}
                    </div>
                    ${!isCorrect ? `
                        <div style="margin-bottom: 5px;">
                            <span style="color: #4CAF50">Correct answer: </span>
                            ${String.fromCharCode(65 + question.correct)}. ${question.options[question.correct]}
                        </div>
                    ` : ''}
                    <div style="color: #aaa; font-size: 0.9rem; font-style: italic;">
                        ${question.explanation}
                    </div>
                </div>
            `;
        });

        resultsHtml += `</div>`;
        resultsHtml += `<button class="restart-btn" onclick="restartQuiz()" style="margin-top: 30px;">Take Quiz Again</button>`;
        resultsHtml += `</div>`;

        quizContent.innerHTML = resultsHtml;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'none';
        questionCounter.style.display = 'none';
        progressBar.style.display = 'none';
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers = new Array(quizData.length).fill(null);
        showQuestion();
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        questionCounter.style.display = 'block';
        progressBar.style.display = 'block';
        scoreDisplay.style.display = 'none';
        updateButtons();
    }

    // Make functions global for HTML onclick
    window.selectOption = selectOption;
    window.restartQuiz = restartQuiz;

    // Event listeners
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    submitBtn.addEventListener('click', showResults);

    // Initialize quiz
    showQuestion();
});