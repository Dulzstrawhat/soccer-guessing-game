// 1. GAME DATA: Define the players, their answers, and their notoriously fun hints!
const players = [
    {
        name: "Lionel Messi",
        answers: ["Messi", "Lionel Messi", "Leo Messi", "La Pulga"],
        hints: [
            "He is known as 'La Pulga' (The Flea).",
            "He has won the Ballon d'Or more times than anyone else.",
            "His current club is Inter Miami CF.",
            "He played his entire European career for FC Barcelona.",
            "He won the FIFA World Cup in 2022."
        ],
    },
    {
        name: "Luis Suárez",
        answers: ["Suárez", "Luis Suarez", "Luis Suárez", "El Pistolero"],
        hints: [
            "Known as 'El Pistolero' (The Gunman).",
            "He is famous for saving a goal with his hand in the 2010 World Cup.",
            "He has been suspended for biting an opponent on three separate occasions.",
            "He won the Golden Boot in the Premier League (with Liverpool) and La Liga (with Barcelona).",
            "He currently plays alongside Messi at Inter Miami CF."
        ],
    },
    {
        name: "Mario Balotelli",
        answers: ["Balotelli", "Mario Balotelli", "Super Mario"],
        hints: [
            "Known for the famous celebration: 'Why Always Me?'",
            "His only Premier League assist was for the title-winning goal in 2012 (Aguero's goal).",
            "He once scored a goal and then asked the referee to sign his match ball.",
            "He spent years playing in Turkey (for Adana Demirspor).",
            "He has played for both AC Milan and Inter Milan."
        ],
    },
    {
        name: "Kevin De Bruyne",
        answers: ["De Bruyne", "Kevin De Bruyne", "KDB"],
        hints: [
            "Known for his incredible passing and crossing ability.",
            "He is a core part of the Belgian 'Golden Generation'.",
            "He currently plays for Napoli (as of late 2025).", // UPDATED CLUB INFO
            "He started his professional career in Belgium at KRC Genk.",
            "He has been named the Premier League Player of the Season multiple times."
        ],
    }
];

// 2. STATE VARIABLES
let targetPlayer;
let currentHints = [];
let hintIndex = 0;

// 3. CACHE DOM ELEMENTS
const hintsList = document.getElementById('hints-list');
const guessInput = document.getElementById('player-guess');
const submitButton = document.getElementById('submit-guess');
const resetButton = document.getElementById('reset-game');
const messageArea = document.getElementById('message');

// 4. CORE GAME FUNCTIONS

// Function to select a random player and reset the game state
function initializeGame() {
    // Pick a random player from the list
    const randomIndex = Math.floor(Math.random() * players.length);
    targetPlayer = players[randomIndex];
    currentHints = [...targetPlayer.hints]; // Copy the hints
    hintIndex = 0;

    // Reset UI elements
    hintsList.innerHTML = ''; // Clear previous hints
    guessInput.value = '';
    messageArea.textContent = '';
    messageArea.className = 'message';
    resetButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
    guessInput.disabled = false;
    guessInput.focus();

    // Start giving the first hint immediately
    giveHint();
}

// Function to display the next clue
function giveHint() {
    if (hintIndex < currentHints.length) {
        const li = document.createElement('li');
        li.textContent = currentHints[hintIndex];
        hintsList.appendChild(li);
        hintIndex++;

        // If it's not the last hint, show a prompt to give another hint
        if (hintIndex < currentHints.length) {
            // Future feature: add a "Give Me Another Hint" button here
        }
    }
}

// Function to check the user's guess
function checkGuess() {
    const userGuess = guessInput.value.trim();

    // Clean and normalize the guess to match the stored answers
    const normalizedGuess = userGuess.toLowerCase().replace(/[^a-z0-9\s]/g, '');

    // Check if the normalized guess is in the target player's possible answers
    const isCorrect = targetPlayer.answers.some(answer => 
        answer.toLowerCase().replace(/[^a-z0-9\s]/g, '') === normalizedGuess
    );
    
    if (isCorrect) {
        // Correct Guess - Game Won
        messageArea.textContent = `🥳 Correct! It was ${targetPlayer.name}! You win!`;
        messageArea.className = 'message success';
        endGame(true);
    } else {
        // Incorrect Guess - Give another hint or end game
        if (hintIndex < currentHints.length) {
            messageArea.textContent = `❌ Nope, not ${userGuess}. Here's another clue!`;
            messageArea.className = 'message warning';
            giveHint();
        } else {
            // All hints used, player loses
            messageArea.textContent = `😩 Out of clues! The player was ${targetPlayer.name}.`;
            messageArea.className = 'message error';
            endGame(false);
        }
    }
}

// Function to disable input/buttons and show the reset button
function endGame(win) {
    submitButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    guessInput.disabled = true;
}

// 5. EVENT LISTENERS
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', initializeGame);

// Allow pressing 'Enter' in the input field to submit the guess
guessInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// 6. INITIALIZATION: Start the game when the script loads
initializeGame();
