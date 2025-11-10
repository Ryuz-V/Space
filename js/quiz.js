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
            correct: 1
        },
        {
            question: "What is the name of the galaxy that contains our Solar System?",
            options: ["Andromeda", "Whirlpool", "Milky Way", "Sombrero"],
            correct: 2
        },
        {
            question: "Which planet has the most prominent ring system?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correct: 1
        },
        {
            question: "What is the closest star to Earth?",
            options: ["Proxima Centauri", "Sirius", "Alpha Centauri", "The Sun"],
            correct: 3
        },
        {
            question: "Which year did humans first land on the Moon?",
            options: ["1965", "1969", "1972", "1958"],
            correct: 1
        },
        {
            question: "What is the largest planet in our Solar System?",
            options: ["Saturn", "Jupiter", "Neptune", "Earth"],
            correct: 1
        },
        {
            question: "Which spacecraft was the first to reach interstellar space?",
            options: ["Voyager 1", "Voyager 2", "Pioneer 10", "New Horizons"],
            correct: 0
        },
        {
            question: "What causes the phases of the Moon?",
            options: [
                "Earth's shadow on the Moon",
                "The Moon's rotation",
                "The relative positions of Earth, Moon, and Sun",
                "The Moon's distance from Earth"
            ],
            correct: 2
        },
        {
            question: "Which planet has the longest day (rotation period)?",
            options: ["Venus", "Mercury", "Jupiter", "Mars"],
            correct: 0
        },
        {
            question: "What is a light-year?",
            options: [
                "The time it takes light to travel from Sun to Earth",
                "The distance light travels in one year",
                "The brightness of a star",
                "The age of light from distant stars"
            ],
            correct: 1
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

    function updateProgress() {
        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;
        questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
        scoreDisplay.textContent = `Score: ${score}`;
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
        
        // Check if answer is correct
        if (optionIndex === quizData[currentQuestion].correct) {
            // Only add score if not already scored for this question
            if (userAnswers[currentQuestion] !== null && !quizData[currentQuestion].answered) {
                score++;
                quizData[currentQuestion].answered = true;
            }
        } else {
            // Remove score if previously correct but now wrong
            if (quizData[currentQuestion].answered) {
                score--;
                quizData[currentQuestion].answered = false;
            }
        }

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

    function showResults() {
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

        resultsHtml += `
                </div>
                <button class="restart-btn" onclick="restartQuiz()">Take Quiz Again</button>
            </div>
        `;

        quizContent.innerHTML = resultsHtml;
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'none';
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers = new Array(quizData.length).fill(null);
        quizData.forEach(q => q.answered = false);
        showQuestion();
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
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