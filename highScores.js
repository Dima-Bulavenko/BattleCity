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

// Example usage
document.getElementById('high-scores-button').addEventListener('click', openHighScoresModal);

// After the game ends and you have the player's score
let playerScore = 1200; // Example score, replace with actual game score
let playerName = prompt("Enter your name:"); // Prompt the player for their name

addHighScore(playerScore, playerName);
