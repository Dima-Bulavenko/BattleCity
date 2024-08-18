// Retro audio
const buttonClickSound = new Audio('assets/sounds/click.wav');
const buttonHoverSound = new Audio('assets/sounds/hover.wav');
const menuMusic = new Audio('assets/sounds/248117__zagi2__retro-gaming-loop.ogg');

// Start playing the menu music automatically when the page loads
window.addEventListener('load', () => {
    menuMusic.loop = true;
    menuMusic.volume = 0.3;
    menuMusic.play().catch(function (error) {
        console.log('Music playback prevented. User interaction required.', error);
    });
});

function startGame() {
    // Stop the menu music when the game starts
    if (menuMusic && !menuMusic.paused) {
        menuMusic.pause();
    }

    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    // Start the Phaser game
    game = new Phaser.Game(config);
}

document.getElementById('start-button').addEventListener('click', () => {
    buttonClickSound.play();
    startGame();
});

document.getElementById('start-button').addEventListener('mouseover', () => {
    buttonHoverSound.play();
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

// Instructions Modal Logic
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
