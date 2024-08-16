const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,       // Automatically resize to fit the parent container
        autoCenter: Phaser.Scale.CENTER_BOTH,         // Center the game in the container
        width: '100%',          
        height: '100%',        
    },
    parent: 'phaser-game',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true, // For retro pixelated art style
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },    // No gravity needed for a top-down game
            debug: false    // Set to true if you want to see the collision boxes
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Create the Phaser game instance
const game = new Phaser.Game(config);

// Preload assets
function preload() {
    // Load the spritesheet (adjust frameWidth and frameHeight to match your sprites)
    this.load.spritesheet('battleCitySprites', 'assets/battle_city_spritesheet.png', {
        frameWidth: 16,  // Width of each frame
        frameHeight: 16  // Height of each frame
    });

    // Load the field image
    this.load.image('battleCityField', 'assets/battle_city_stage_01.png');
}

var player;
var cursors;

// Create game objects
function create() {

    // Add the field image to the scene and set its position
    const field = this.add.image(400, 300, 'battleCityField');

    // Calculate the world bounds based on the field's size and position
    const fieldWidth = 700;
    const fieldHeight = 500;
    const fieldX = 400 - fieldWidth / 2;
    const fieldY = 300 - fieldHeight / 2;

    // Create animations for each direction
    this.anims.create({
        key: 'moveUp',
        frames: this.anims.generateFrameNumbers('battleCitySprites', { start: 0, end: 1 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'moveLeft',
        frames: this.anims.generateFrameNumbers('battleCitySprites', { start: 2, end: 3 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'moveDown',
        frames: this.anims.generateFrameNumbers('battleCitySprites', { start: 4, end: 5 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'moveRight',
        frames: this.anims.generateFrameNumbers('battleCitySprites', { start: 6, end: 7 }),
        frameRate: 5,
        repeat: -1
    });

    // Create the player sprite and set its initial position
    player = this.physics.add.sprite(100, 100, 'battleCitySprites');

    // Set collision boundaries for the player
    player.setCollideWorldBounds(true);

    // Enable cursor keys for player movement
    cursors = this.input.keyboard.createCursorKeys();

     // Set world bounds to match the field size
     this.physics.world.setBounds(fieldX, fieldY, fieldWidth, fieldHeight);

    
    player.body.setCollideWorldBounds(true);
}

// Update the game state
function update() {
    // Reset player velocity
    player.setVelocity(0);

    // Handle player movement
    if (cursors.up.isDown) {
        player.setVelocityY(-100);
        player.anims.play('moveUp', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(100);
        player.anims.play('moveDown', true);
    } else if (cursors.left.isDown) {
        player.setVelocityX(-100);
        player.anims.play('moveLeft', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(100);
        player.anims.play('moveRight', true);
    } else {
        player.anims.stop();
    }
}