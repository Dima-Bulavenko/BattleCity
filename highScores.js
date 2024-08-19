let currentScore = 0;
let playerLives = 3; // Player starts with 3 lives
let health = 100; // Player starts with 100% health

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

    updateHealthBar(); // Update the health bar after losing a life
    // Update the lives display
    updateLivesDisplay();

    // Check if the player has no lives left
    if (playerLives <= 0) {
        showGameOver(); // Trigger game over
    } 
}


// Health bar update function
function updateHealthBar() {
    const healthBar = document.getElementById('health-bar');
    
    // Calculate the new width based on the remaining lives
    const newWidth = (playerLives / 3) * 100;
    healthBar.style.width = `${newWidth}%`;

    // Change color based on health percentage
    if (newWidth > 66) {
        healthBar.style.backgroundColor = '#4caf50'; // Green for high health
    } else if (newWidth > 33) {
        healthBar.style.backgroundColor = '#ff9800'; // Orange for medium health
    } else {
        healthBar.style.backgroundColor = '#f44336'; // Red for low health
    }
}

// Game Over screen display function
function showGameOver() {
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'block';
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







