
//Start Game
function startGame() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('phaser-game').style.display = 'block';
}

document.getElementById('start-button').addEventListener('click', startGame);

//Retro audio 
const buttonClickSound = new Audio('assets/sounds/click.wav');
const buttonHoverSound = new Audio('assets/sounds/hover.wav');

document.getElementById('start-button').addEventListener('click', () => {
    buttonClickSound.play();
    this.scene.start('GameScene'); // Start the game scene in Phaser
});

document.getElementById('start-button').addEventListener('mouseover', () => {
    buttonHoverSound.play();
});


    // Example: Initial health set to 100%
    let health = 100;

    function updateHealthBar(newHealth) {
        // Update the health value
        health = newHealth;

        // Calculate the width as a percentage
        const healthBar = document.getElementById('health-bar');
        healthBar.style.width = health + '%';

        // Change color based on health percentage
        if (health > 50) {
            healthBar.style.backgroundColor = '#4caf50'; // Green for high health
        } else if (health > 20) {
            healthBar.style.backgroundColor = '#ff9800'; // Orange for medium health
        } else {
            healthBar.style.backgroundColor = '#f44336'; // Red for low health
        }
    }

    // Example: Reduce health by 20% as a demonstration
    updateHealthBar(80); // Call this function whenever the player takes damage






function showGameOver() {
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'block';
}





//Instructions Modal
const modal = document.getElementById("instructions-modal");
const btn = document.getElementById("instructions-button");
const span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



