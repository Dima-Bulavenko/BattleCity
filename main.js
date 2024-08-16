const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
            gravity: { y: 0 }, // No gravity needed for a top-down game
            debug: false // Set to true if you want to see the collision boxes
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
    this.load.tilemapTiledJSON("map", "assets/map1.json")
}

var player;
var cursors;

// Create game objects
function create() {
    // Calculate the world bounds based on the field's size and position
    const fieldWidth = 208;
    const fieldHeight = 208;
    const fieldX = 400 - fieldWidth / 2;
    const fieldY = 300 - fieldHeight / 2;

    // Load the map and set up the layers
    const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage("map1", "battleCityField");
    const layer = map.createLayer("toplayer", tileset, fieldX, fieldY);

    // Assuming 'wall' is the layer you want to be collidable
    const wallLayer = map.createLayer("wall", tileset, fieldX, fieldY);
    const armorWallLayer = map.createLayer("armor_wall", tileset, fieldX, fieldY)
    const eagleLayer = map.createLayer("eagle", tileset, fieldX, fieldY)


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

    // Set collision on the wall tiles. 
    // Assuming that tiles with IDs 1 and above are walls.
    wallLayer.setCollisionByExclusion([-1]); // Exclude the tile with ID -1 from collisions
    armorWallLayer.setCollisionByExclusion([-1]);
    eagleLayer.setCollisionByExclusion([-1]);
    
    // Add collision between the player and the wall layer
    this.physics.add.collider(player, wallLayer);
    this.physics.add.collider(player, armorWallLayer);
    this.physics.add.collider(player, eagleLayer);

}

// Update the game state
function update() {
    if (cursors.left.isDown) {
        moveTank('left');
    } else if (cursors.right.isDown) {
        moveTank('right');
    } else if (cursors.up.isDown) {
        moveTank('up');
    } else if (cursors.down.isDown) {
        moveTank('down');
    } else {
        player.setVelocity(0, 0); // Stop movement if no key is pressed
    }
    
}

function roundTo(value, step) {
    return Math.round(value / step) * step;
}

function moveTank(direction) {
    let velocity = 70;

    switch (direction) {
        case 'left':
            player.y = roundTo(player.y, 4);
            player.setVelocity(-velocity, 0);
            player.anims.play('moveLeft', true);
            break;
        case 'right':
            player.y = roundTo(player.y, 4);
            player.setVelocity(velocity, 0);
            player.anims.play('moveRight', true);
            break;
        case 'up':
            player.x = roundTo(player.x, 4);
            player.setVelocity(0, -velocity);
            player.anims.play('moveUp', true);
            break;
        case 'down':
            player.x = roundTo(player.x, 4);
            player.setVelocity(0, velocity);
            player.anims.play('moveDown', true);
            break;
    }
}
