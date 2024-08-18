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
