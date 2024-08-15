/*const buttonClickSound = new Audio('assets/sounds/click.wav');
const buttonHoverSound = new Audio('assets/sounds/hover.wav');

document.getElementById('start-button').addEventListener('click', () => {
    buttonClickSound.play();
    this.scene.start('GameScene'); // Start the game scene in Phaser
});

document.getElementById('start-button').addEventListener('mouseover', () => {
    buttonHoverSound.play();
});






function showGameOver() {
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'block';
}


*/




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

/*

function startGame() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('phaser-game').style.display = 'block';
}

document.getElementById('start-button').addEventListener('click', startGame);

*/