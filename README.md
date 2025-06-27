# alphabet-game
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>words Game</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>
<body>
    <div class="shehan">
        <h1>🎯 Word Finding Game</h1>
        
        <div class="word-display" id="wordDisplay"></div>
        
        <div class="stats">
            <div class="stat-item">
                <div>Wrong Guesses</div>
                <div id="wrongCount">0</div>
            </div>
            <div class="stat-item">
                <div>Remaining</div>
                <div id="remainingCount">6</div>
            </div>
            <div class="stat-item best-score">
                <div>Best Score</div>
                <div id="bestScore">0</div>
            </div>
        </div>
        
        <div class="category-selector">
            <label for="categorySelect">Choose Category:</label>
            <select id="categorySelect" onchange="changeCategory()">
                <option value="random">🎲 Random (All Categories)</option>
                <option value="animals">🦁 Animals</option>
                <option value="technology">💻 Technology</option>
                <option value="nature">🌿 Nature</option>
                <option value="emotions">😊 Emotions</option>
                <option value="food">🍕 Food</option>
                <option value="colors">🎨 Colors</option>
                <option value="sports">⚽ Sports</option>
                <option value="music">🎵 Music</option>
            </select>
        </div>
        
        <div class="alphabet-grid" id="alphabetGrid"></div>
        
        <div class="message" id="message">Guess a letter to start!</div>
        
        <button class="new-game-btn" onclick="newGame()">New Game</button>
    </div>

   
</body>
</html>


  
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #667eea;
            --secondary: #764ba2;
            --success: #10b981;
            --danger: #ef4444;
            --warning: #f59e0b;
            --info: #3b82f6;
            --dark: #1f2937;
            --gray: #6b7280;
            --light: #f8fafc;
            --white: #ffffff;
            --shadow: rgba(0, 0, 0, 0.1);
            --shadow-lg: rgba(0, 0, 0, 0.25);
            --gradient: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            --gradient-success: linear-gradient(135deg, #10b981 0%, #059669 100%);
            --gradient-danger: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        body {
            font-family: 'times new roman', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(black);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow-x: hidden;
        }

        /* Animated Background */
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
            animation: backgroundMove 20s ease-in-out infinite;
            z-index: -1;
        }

        @keyframes backgroundMove {
            0%, 100% { transform: translateX(0) translateY(0); }
            33% { transform: translateX(-20px) translateY(-30px); }
            66% { transform: translateX(20px) translateY(30px); }
        }

        .game-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 2.5rem;
            box-shadow: 0 25px 50px var(--shadow-lg);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 500px;
            width: 100%;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .game-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient);
            border-radius: 24px 24px 0 0;
        }

        .game-header {
            margin-bottom: 2rem;
        }

        .game-title {
            font-size: 2.5rem;
            font-weight: 800;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .game-subtitle {
            color: var(--gray);
            font-size: 1.1rem;
            font-weight: 400;
        }

        .game-stats {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: var(--light);
            padding: 1rem;
            border-radius: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px var(--shadow);
        }

        .stat-number {
            display: block;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 0.25rem;
        }

        .stat-label {
            font-size: 0.85rem;
            color: var(--gray);
            font-weight: 500;
        }

        .game-display {
            background: var(--light);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            border: 3px solid rgba(255, 255, 255, 0.5);
            position: relative;
            overflow: hidden;
        }

        .mystery-number {
            font-size: 4rem;
            font-weight: 900;
            color: var(--primary);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            min-height: 80px;
        }

        .mystery-number.revealed {
            animation: numberReveal 0.8s ease-out;
            background: var(--gradient-success);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        @keyframes numberReveal {
            0% {
                transform: scale(0.5) rotate(-180deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.2) rotate(-90deg);
                opacity: 0.7;
            }
            100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }

        .range-display {
            font-size: 1.1rem;
            color: var(--gray);
            font-weight: 500;
        }

        .input-section {
            margin-bottom: 2rem;
        }

        .input-group {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .guess-input {
            flex: 1;
            padding: 1rem 1.5rem;
            border: 3px solid var(--light);
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
            background: var(--white);
            transition: all 0.3s ease;
            outline: none;
        }

        .guess-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
        }

        .guess-input:invalid {
            border-color: var(--danger);
        }

        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .btn:hover::before {
            left: 100%;
        }

        .btn-primary {
            background: var(--gradient);
            color: var(--white);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: var(--light);
            color: var(--dark);
            border: 2px solid var(--light);
        }

        .btn-secondary:hover {
            background: var(--white);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px var(--shadow);
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        .feedback-section {
            margin-bottom: 2rem;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .feedback-message {
            font-size: 1.2rem;
            font-weight: 600;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border: 2px solid transparent;
            transition: all 0.5s ease;
            max-width: 100%;
        }

        .feedback-message.success {
            background: var(--gradient-success);
            color: var(--white);
            animation: successPulse 0.6s ease-out;
        }

        .feedback-message.too-high {
            background: rgba(239, 68, 68, 0.1);
            color: var(--danger);
            border-color: var(--danger);
            animation: shake 0.5s ease-out;
        }

        .feedback-message.too-low {
            background: rgba(59, 130, 246, 0.1);
            color: var(--info);
            border-color: var(--info);
            animation: shake 0.5s ease-out;
        }

        .feedback-message.getting-close {
            background: rgba(245, 158, 11, 0.1);
            color: var(--warning);
            border-color: var(--warning);
            animation: warmPulse 0.8s ease-out;
        }

        @keyframes successPulse {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        @keyframes warmPulse {
            0%, 100% { background-color: rgba(245, 158, 11, 0.1); }
            50% { background-color: rgba(245, 158, 11, 0.2); }
        }

        .attempts-list {
            background: var(--light);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            max-height: 200px;
            overflow-y: auto;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .attempts-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .attempts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
            gap: 0.5rem;
        }

        .attempt-item {
            background: var(--white);
            padding: 0.5rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }

        .attempt-item.too-high {
            color: var(--danger);
            border-color: var(--danger);
        }

        .attempt-item.too-low {
            color: var(--info);
            border-color: var(--info);
        }

        .attempt-item.close {
            color: var(--warning);
            border-color: var(--warning);
        }

        .game-controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .game-container {
                padding: 1.5rem;
                margin: 1rem;
            }

            .game-title {
                font-size: 2rem;
            }

            .game-stats {
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
            }

            .mystery-number {
                font-size: 3rem;
            }

            .input-group {
                flex-direction: column;
                gap: 1rem;
            }

            .game-controls {
                flex-direction: column;
            }

            .attempts-grid {
                grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
            }
        }

        @media (max-width: 480px) {
            .game-title {
                font-size: 1.8rem;
            }
            
            .game-stats {
                grid-template-columns: 1fr;
                gap: 0.5rem;
            }

            .stat-card {
                padding: 0.75rem;
            }

            .mystery-number {
                font-size: 2.5rem;
            }
        }

        /* Celebration Animation */
        .celebration {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            overflow: hidden;
            border-radius: 24px;
        }

        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: var(--primary);
            animation: confetti 3s ease-out forwards;
        }

        @keyframes confetti {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }

        /* Loading State */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: var(--white);
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    


        let targetNumber = 0;
        let attempts = 0;
        let gameOver = false;
        let allAttempts = [];
        let bestScore = localStorage.getItem('bestScore') || null;
        let gamesPlayed = parseInt(localStorage.getItem('gamesPlayed')) || 0;

        // Initialize game
        function initGame() {
            targetNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            gameOver = false;
            allAttempts = [];
            
            document.getElementById('attempts').textContent = attempts;
            document.getElementById('bestScore').textContent = bestScore || '-';
            document.getElementById('gamesPlayed').textContent = gamesPlayed;
            document.getElementById('mysteryNumber').textContent = '🤔';
            document.getElementById('mysteryNumber').classList.remove('revealed');
            document.getElementById('guessInput').value = '';
            document.getElementById('guessInput').disabled = false;
            document.getElementById('submitGuess').disabled = false;
            document.getElementById('attemptsList').style.display = 'none';
            document.getElementById('attemptsGrid').innerHTML = '';
            
            showFeedback('Welcome! Make your first guess!', '');
            
            // Focus on input
            document.getElementById('guessInput').focus();
        }

        // Make a guess
        function makeGuess() {
            if (gameOver) return;
            
            const guessInput = document.getElementById('guessInput');
            const guess = parseInt(guessInput.value);
            
            // Validate input
            if (isNaN(guess) || guess < 1 || guess > 100) {
                showFeedback('Please enter a valid number between 1 and 100!', 'error');
                return;
            }
            
            // Check if already guessed
            if (allAttempts.find(attempt => attempt.guess === guess)) {
                showFeedback('You already guessed that number! Try another one.', 'error');
                return;
            }
            
            attempts++;
            document.getElementById('attempts').textContent = attempts;
            
            // Add attempt to list
            const attemptType = getAttemptType(guess);
            allAttempts.push({ guess, type: attemptType });
            updateAttemptsList();
            
            // Check if correct
            if (guess === targetNumber) {
                gameWon();
            } else {
                provideFeedback(guess);
            }
            
            guessInput.value = '';
            guessInput.focus();
        }

        // Determine attempt type
        function getAttemptType(guess) {
            const difference = Math.abs(guess - targetNumber);
            if (difference <= 5) return 'close';
            if (guess > targetNumber) return 'too-high';
            return 'too-low';
        }

        // Provide feedback for incorrect guess
        function provideFeedback(guess) {
            const difference = Math.abs(guess - targetNumber);
            let message = '';
            let type = '';
            
            if (difference <= 5) {
                message = `🔥 Very close! You're getting warm!`;
                type = 'getting-close';
            } else if (difference <= 10) {
                if (guess > targetNumber) {
                    message = `📉 Too high! But you're getting warmer!`;
                    type = 'too-high';
                } else {
                    message = `📈 Too low! But you're getting warmer!`;
                    type = 'too-low';
                }
            } else if (difference <= 20) {
                if (guess > targetNumber) {
                    message = `⬇️ Too high! Try going lower.`;
                    type = 'too-high';
                } else {
                    message = `⬆️ Too low! Try going higher.`;
                    type = 'too-low';
                }
            } else {
                if (guess > targetNumber) {
                    message = `❄️ Way too high! Go much lower.`;
                    type = 'too-high';
                } else {
                    message = `🧊 Way too low! Go much higher.`;
                    type = 'too-low';
                }
            }
            
            showFeedback(message, type);
        }

        // Handle game won
        function gameWon() {
            gameOver = true;
            gamesPlayed++;
            
            // Update best score
            if (!bestScore || attempts < bestScore) {
                bestScore = attempts;
                localStorage.setItem('bestScore', bestScore);
                document.getElementById('bestScore').textContent = bestScore;
            }
            
            localStorage.setItem('gamesPlayed', gamesPlayed);
            document.getElementById('gamesPlayed').textContent = gamesPlayed;
            
            // Reveal number
            document.getElementById('mysteryNumber').textContent = targetNumber;
            document.getElementById('mysteryNumber').classList.add('revealed');
            
            // Disable inputs
            document.getElementById('guessInput').disabled = true;
            document.getElementById('submitGuess').disabled = true;
            
            // Show success message
            let successMessage = '';
            if (attempts === 1) {
                successMessage = `🎉 INCREDIBLE! You got it in just 1 try! Are you psychic?`;
            } else if (attempts <= 3) {
                successMessage = `🌟 AMAZING! You found it in ${attempts} attempts! Excellent intuition!`;
            } else if (attempts <= 6) {
                successMessage = `🎯 Great job! You found it in ${attempts} attempts! Well played!`;
            } else if (attempts <= 10) {
                successMessage = `✅ Nice work! You found it in ${attempts} attempts! Keep practicing!`;
            } else {
                successMessage = `🎮 You found it in ${attempts} attempts! Never give up!`;
            }
            
            showFeedback(successMessage, 'success');
            
            // Show celebration
            celebrate();
        }

        // Show feedback message
        function showFeedback(message, type) {
            const feedbackElement = document.getElementById('feedbackMessage');
            feedbackElement.textContent = message;
            feedbackElement.className = `feedback-message ${type}`;
            feedbackElement.style.opacity = '1';
        }

        // Update attempts list
        function updateAttemptsList() {
            const attemptsList = document.getElementById('attemptsList');
            const attemptsGrid = document.getElementById('attemptsGrid');
            
            attemptsList.style.display = 'block';
            
            const latestAttempt = allAttempts[allAttempts.length - 1];
            const attemptElement = document.createElement('div');
            attemptElement.className = `attempt-item ${latestAttempt.type}`;
            attemptElement.textContent = latestAttempt.guess;
            
            attemptsGrid.appendChild(attemptElement);
            
            // Scroll to bottom
            attemptsList.scrollTop = attemptsList.scrollHeight;
        }

        // Show hint
        function showHint() {
            if (gameOver) return;
            
            let hint = '';
            const targetNumber = window.targetNumber; // Access the target number
            
            if (targetNumber % 2 === 0) {
                hint = '💡 Hint: The number is even!';
            } else {
                hint = '💡 Hint: The number is odd!';
            }
            
            // Add range hint based on attempts
            if (attempts >= 5) {
                if (targetNumber <= 25) {
                    hint += ' It\'s in the lower quarter (1-25).';
                } else if (targetNumber <= 50) {
                    hint += ' It\'s in the second quarter (26-50).';
                } else if (targetNumber <= 75) {
                    hint += ' It\'s in the third quarter (51-75).';
                } else {
                    hint += ' It\'s in the upper quarter (76-100).';
                }
            }
            
            showFeedback(hint, 'getting-close');
        }

        // Celebration animation
        function celebrate() {
            const celebration = document.getElementById('celebration');
            const colors = ['#667eea', '#764ba2', '#10b981', '#f59e0b', '#ef4444'];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDelay = Math.random() * 2 + 's';
                    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                    
                    celebration.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 4000);
                }, i * 100);
            }
        }

        // Start new game
        function newGame() {
            // Clear celebration
            document.getElementById('celebration').innerHTML = '';
            initGame();
        }

        // Handle Enter key
        document.getElementById('guessInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                makeGuess();
            }
        });

        // Initialize game on load
        window.addEventListener('load', initGame);
    
