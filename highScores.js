let currentScore = 0;
let playerLives = 3; // Player starts with 3 lives

//  Logic to increase the score when an enemy is destroyed.
function initializeScore() {
    currentScore = 0;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = `Score: ${currentScore}`;
}

function increaseScore(amount) {
    currentScore += amount;
    updateScoreDisplay();
}


// Function to update the lives display on the HUD
function updateLivesDisplay() {
    const livesElement = document.getElementById('lives');
    livesElement.textContent = `Lives: ${playerLives}`;
}

// Function to handle when the player is hit
function playerHit() {
    playerLives -= 1; // Decrease player lives by 1

    // Update the lives display
    updateLivesDisplay();

    // Check if the player has no lives left
    if (playerLives <= 0) {
        showGameOver(); // Trigger game over
    } else {
        // Update the health bar accordingly
        const healthPercentage = (playerLives / 3) * 100; // Assuming 3 lives means 100%
        updateHealthBar(healthPercentage);
    }
}



// Function to get high scores from localStorage
function getHighScores() {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    return highScores;
}

// Function to save high scores to localStorage
function saveHighScores(highScores) {
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Function to add a new score
function addHighScore(score, playerName) {
    let highScores = getHighScores();
    let date = new Date().toLocaleDateString(); // Get the current date
    highScores.push({ score: score, name: playerName, date: date });
    highScores.sort((a, b) => b.score - a.score); // Sort in descending order
    highScores = highScores.slice(0, 3); // Keep only top 3 scores
    saveHighScores(highScores);
}

// Function to display high scores
function displayHighScores() {
    let highScores = getHighScores();
    let highScoreList = highScores.map(score => `<li>${score.name}: ${score.score} (${score.date})</li>`).join('');
    document.getElementById('highscore-list').innerHTML = `<ul>${highScoreList}</ul>`;
}

// Function to open the High Scores modal
function openHighScoresModal() {
    displayHighScores(); // Update the high scores before showing the modal
    document.getElementById('highScoresModal').style.display = 'block'; // Show the modal
}

// Function to close the High Scores modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none'; // Hide the modal
}

// Example usage for the high scores modal
document.getElementById('high-scores-button').addEventListener('click', openHighScoresModal);

// Ensure that this line is commented out until you actually define the `endGame` function
// let finalScore = 1200; // Replace with the actual final score when the game ends
// endGame(finalScore);

// Instructions Modal Logic
const instructionsModal = document.getElementById("instructions-modal");
const instructionsBtn = document.getElementById("instructions-button");
const instructionsClose = instructionsModal.getElementsByClassName("close")[0];

// When the user clicks the Instructions button, open the modal
instructionsBtn.onclick = function() {
    instructionsModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
instructionsClose.onclick = function() {
    instructionsModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == instructionsModal) {
        instructionsModal.style.display = "none";
    }
}

// Close modal if escape key is pressed
window.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        instructionsModal.style.display = "none";
        closeModal('highScoresModal');
    }
});


// Health bar example (if used in the game)
let health = 100;

function updateHealthBar(newHealth) {
    health = newHealth;
    const healthBar = document.getElementById('health-bar');
    healthBar.style.width = health + '%';

    if (health > 50) {
        healthBar.style.backgroundColor = '#4caf50';
    } else if (health > 20) {
        healthBar.style.backgroundColor = '#ff9800';
    } else {
        healthBar.style.backgroundColor = '#f44336';
    }
}

updateHealthBar(80); // Example to reduce health by 20% as a demonstration

// Game Over screen display function
function showGameOver() {
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'block';
}


