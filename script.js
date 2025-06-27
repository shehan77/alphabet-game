 
        const wordCategories = {
            animals: ['ELEPHANT', 'BUTTERFLY', 'GIRAFFE', 'PENGUIN', 'KANGAROO', 'DOLPHIN', 'TIGER', 'RABBIT', 'PANDA', 'ZEBRA','fox', 'wolf', 'bear', 'lion', 'eagle', 'shark', 'whale', 'octopus', 'snake', 'crocodile', 'turtle', 'frog', 'rabbit', 'deer', 'squirrel', 'bat', 'hedgehog', 'otter'],
            technology: ['JAVASCRIPT', 'COMPUTER', 'KEYBOARD', 'MONITOR', 'INTERNET', 'WEBSITE', 'DATABASE', 'PROGRAMMING', 'ALGORITHM', 'FUNCTION', 'VARIABLE', 'BROWSER', 'SOFTWARE', 'HARDWARE', 'NETWORK', 'APPLICATION', 'SERVER', 'CLOUD', 'AI', 'ROBOTICS'],
            nature: ['RAINBOW', 'MOUNTAIN', 'OCEAN', 'FOREST', 'DESERT', 'VOLCANO', 'RIVER', 'SUNSET', 'THUNDER', 'LIGHTNING', 'WILDFLOWER', 'SNOWFLAKE', 'WATERFALL', 'CLOUD', 'STARS', 'GALAXY', 'PLANET', 'ECLIPSE', 'AURORA'],
            emotions: ['HAPPINESS', 'FRIENDSHIP', 'ADVENTURE', 'COURAGE', 'EXCITEMENT', 'PEACEFUL', 'JOYFUL', 'CREATIVE', 'CONFIDENT', 'GRATEFUL', 'HOPEFUL', 'INSPIRED', 'RELAXED', 'SADNESS', 'ANGER', 'FEAR', 'LOVE', 'SURPRISE', 'DISGUST'],
            food: ['CHOCOLATE', 'PIZZA', 'SANDWICH', 'BANANA', 'STRAWBERRY', 'COOKIE', 'PANCAKE', 'BURGER', 'SPAGHETTI', 'AVOCADO', 'TACOS', 'ICE CREAM', 'SALAD', 'BROWNIE', 'CUPCAKE', 'DONUT', 'FRUIT SALAD', 'SMOOTHIE', 'PASTA'],
            colors: ['PURPLE', 'ORANGE', 'YELLOW', 'CRIMSON', 'TURQUOISE', 'MAGENTA', 'SILVER', 'BRONZE', 'EMERALD', 'SAPPHIRE', 'GOLD', 'INDIGO', 'VIOLET', 'CYAN', 'TEAL', 'MAROON', 'NAVY', 'OLIVE', 'PINK'],
            sports: ['FOOTBALL', 'BASKETBALL', 'TENNIS', 'SWIMMING', 'VOLLEYBALL', 'BASEBALL', 'HOCKEY', 'CRICKET', 'BADMINTON', 'GOLF', 'RUGBY', 'BOXING', 'CYCLING', 'SKATING', 'ARCHERY', 'GYMNASTICS', 'WRESTLING', 'ATHLETICS', 'SURFING'],
            music: ['GUITAR', 'PIANO', 'VIOLIN', 'TRUMPET', 'DRUMS', 'SAXOPHONE', 'FLUTE', 'MELODY', 'HARMONY', 'RHYTHM', 'SONGWRITING', 'COMPOSER', 'VOCALS', 'CHORUS', 'LYRICS', 'BEATBOXING', 'DJING', 'SINGING', 'BAND', 'CONCERT']
        };

        // Function to get random word from all categories
        function getRandomWord() {
            const allWords = Object.values(wordCategories).flat();
            return allWords[Math.floor(Math.random() * allWords.length)];
        }

        // Function to get random word from specific category
        function getRandomWordFromCategory(category) {
            const categoryWords = wordCategories[category];
            return categoryWords[Math.floor(Math.random() * categoryWords.length)];
        }

        let currentWord = '';
        let guessedWord = [];
        let wrongGuesses = 0;
        let maxWrongGuesses = 5;
        let gameOver = false;
        let bestScore = 0;
        let selectedCategory = 'random';

        // Load best score from memory
        function loadBestScore() {
            bestScore = parseInt(document.getElementById('bestScore').textContent) || 0;
        }

        // Save best score to display
        function saveBestScore() {
            document.getElementById('bestScore').textContent = bestScore;
        }

        function initGame() {
            // Get word based on selected category
            if (selectedCategory === 'random') {
                currentWord = getRandomWord();
            } else {
                currentWord = getRandomWordFromCategory(selectedCategory);
            }
            
            guessedWord = Array(currentWord.length).fill('_');
            wrongGuesses = 0;
            gameOver = false;
            
            updateDisplay();
            createAlphabetGrid();
            updateStats();
            loadBestScore();
            document.getElementById('message').textContent = 'Guess a letter to start!';
            document.getElementById('message').className = 'message';
        }

        function changeCategory() {
            selectedCategory = document.getElementById('categorySelect').value;
            newGame(); // Start a new game with the selected category
        }

        function createAlphabetGrid() {
            const grid = document.getElementById('alphabetGrid');
            grid.innerHTML = '';
            
            for (let i = 65; i <= 90; i++) {
                const letter = String.fromCharCode(i);
                const btn = document.createElement('button');
                btn.className = 'letter-btn';
                btn.textContent = letter;
                btn.id = `btn-${letter}`;
                btn.onclick = () => guessLetter(letter);
                grid.appendChild(btn);
            }
        }

        function guessLetter(letter) {
            if (gameOver) return;
            
            const btn = document.getElementById(`btn-${letter}`);
            btn.disabled = true;
            
            if (currentWord.includes(letter)) {
                // Correct guess
                btn.classList.add('correct');
                for (let i = 0; i < currentWord.length; i++) {
                    if (currentWord[i] === letter) {
                        guessedWord[i] = letter;
                    }
                }
                
                // Check if word is complete
                if (!guessedWord.includes('_')) {
                    gameOver = true;
                    const score = maxWrongGuesses - wrongGuesses;
                    
                    // Update best score if current score is better
                    if (score > bestScore) {
                        bestScore = score;
                        saveBestScore();
                        document.getElementById('message').textContent = `🎉 New Best Score! You won with ${score} points!`;
                    } else {
                        document.getElementById('message').textContent = `🎉 Congratulations! You won with ${score} points!`;
                    }
                    document.getElementById('message').className = 'message win';
                    document.querySelector('.word-display').classList.add('bounce');
                } else {
                    document.getElementById('message').textContent = 'Great guess! Keep going!';
                    document.getElementById('message').className = 'message';
                }
            } else {
                // Wrong guess
                wrongGuesses++;
                updateStats();
                
                if (wrongGuesses >= maxWrongGuesses) {
                    gameOver = true;
                    guessedWord = currentWord.split(''); // Reveal the word
                    document.getElementById('message').textContent = `💀 Game Over! The correct answer was: "${currentWord}"`;
                    document.getElementById('message').className = 'message lose';
                    
                    // Disable all remaining buttons
                    const allBtns = document.querySelectorAll('.letter-btn:not(:disabled)');
                    allBtns.forEach(btn => btn.disabled = true);
                } else {
                    const remaining = maxWrongGuesses - wrongGuesses;
                    document.getElementById('message').textContent = `Wrong guess! ${remaining} tries left.`;
                    document.getElementById('message').className = 'message';
                }
            }
            
            updateDisplay();
        }

        function updateDisplay() {
            document.getElementById('wordDisplay').textContent = guessedWord.join(' ');
        }

        function updateStats() {
            document.getElementById('wrongCount').textContent = wrongGuesses;
            document.getElementById('remainingCount').textContent = maxWrongGuesses - wrongGuesses;
        }

        function newGame() {
            document.querySelector('.word-display').classList.remove('bounce');
            initGame();
        }

        // Initialize the game when page loads
        initGame();
    