// Retro audio
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
    // Hide the main menu and show the Phaser game canvas
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
    startGame();
});

// Game Over screen display function
function showGameOver() {
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'block';
}



