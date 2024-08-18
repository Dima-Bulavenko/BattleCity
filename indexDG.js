// Function to start the game
function startGame() {
    // Hide the main menu and show the Phaser game canvas
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('phaser-game').style.display = 'block';

    // Play the button click sound
    buttonClickSound.play();

    // Start the Phaser game scene
    game.scene.start('GameScene');

    // Add a delay before enemies start moving
    game.scene.scenes[0].time.delayedCall(500, () => {
    // Functionality to start enemy movement
    startEnemyMovement(game.scene.scenes[0]);
    });

    // Add a delay before enemies start shooting (e.g., 3 seconds)
    game.scene.scenes[0].time.delayedCall(3000, () => {
        // Functionality to start enemy shooting
        startEnemyShooting(game.scene.scenes[0]);
    });
}

/**
 * Function to start enemy movement
**/ 
function startEnemyMovement(scene) {
    if (scene.enemies) {
        scene.enemies.children.iterate(function (enemy) {
            // Start random movement and shooting
            changeEnemyDirectionRandomly.call(scene, enemy);
            shootRandomly.call(scene, enemy);
        });
    }
}

/**
* Function to start enemy shooting
*/
function startEnemyShooting(scene) {
    if (scene.enemies) {
        scene.enemies.children.iterate(function (enemy) {
            // Start random shooting
            shootRandomly.call(scene, enemy);
        });
    }
}

// Attach event listeners to the start button
document.getElementById('start-button').addEventListener('click', startGame);

document.getElementById('start-button').addEventListener('mouseover', () => {
    buttonHoverSound.play();
});

// Retro audio setup
const buttonClickSound = new Audio('assets/sounds/click.wav');
const buttonHoverSound = new Audio('assets/sounds/hover.wav');


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



