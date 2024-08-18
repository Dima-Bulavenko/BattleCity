
// Menu Music
let menuMusic;

// Preload the menu music file in Phaser's preload function
function preload() {
    this.load.audio('menuMusic', 'assets/sounds/menu-music.ogg');
}

function create() {
    // Add and play the menu music immediately when the menu is shown
    menuMusic = this.sound.add('menuMusic');
    menuMusic.play({
        loop: true,
        volume: 0.3
    });
}

// Start Game
function startGame() {
    // Stop the menu music
    if (menuMusic && menuMusic.isPlaying) {
        menuMusic.stop();
    }

    // Hide the main menu
    document.getElementById('main-menu').style.display = 'none';
    
    // Show the game container
    document.getElementById('phaser-game').style.display = 'block';

    gameContainer.style.display = 'block';
    phaserGame.style.position = 'absolute'; // Ensure the game is correctly positioned
    phaserGame.style.top = '110px'; // Keep the game within the bounds of the container

    // Start the Phaser game instance
    game = new Phaser.Game(config);
}

document.getElementById('start-button').addEventListener('click', startGame);

// Retro audio 
const buttonClickSound = new Audio('assets/sounds/click.wav');
const buttonHoverSound = new Audio('assets/sounds/hover.wav');

// Play click sound when the start button is clicked
document.getElementById('start-button').addEventListener('click', () => {
    buttonClickSound.play();
});

// Play hover sound when hovering over the start button
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
