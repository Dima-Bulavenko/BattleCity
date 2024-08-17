// Basic game parameters
const canvasWidth = 800;
const canvasHeight = 600;
const mapWidth = 208;
const mapHeight = 208;
const mapX = canvasWidth / 2 - mapWidth / 2;
const mapY = canvasHeight / 2 - mapHeight / 2;
const tileSize = 16;

const config = {
    type: Phaser.AUTO,
    width: canvasWidth,
    height: canvasHeight,
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
};

// Create the Phaser game instance
const game = new Phaser.Game(config);

// Declare variables globally
var player;
var cursors;
var bullets;
var fireKey;
var enemies; 
// Layers
var toplayer, wallLayer, armorWallLayer, eagleLayer
// Music
let music;
let speakerButtonElement = document.getElementById('speaker-button');
let speakerIconElement = document.getElementById('speaker-icon');

// Preload assets
function preload() {
    // Load the spritesheet (adjust frameWidth and frameHeight to match your sprites)
    this.load.spritesheet(
        "battleCitySprites",
        "assets/battle_city_spritesheet.png",
        {
            frameWidth: 16, // Width of each frame
            frameHeight: 16, // Height of each frame
        }
    );

    // load tank spriteset
    createSpriteSet.call(this, 'playerSprites', 0, 7);
    createSpriteSet.call(this, 'enemySprites', 8, 15);

    // Load the field image
    this.load.image('battleCityField', 'assets/battle_city_stage_01.png');
    this.load.tilemapTiledJSON("map", "assets/map1.json");

    // Preload the music file
    this.load.audio('retroMusic', 'assets/sounds/248117__zagi2__retro-gaming-loop.ogg');
}

// Create game objects and add music
function create() {
    // Add and play the background music
    music = this.sound.add('retroMusic');
    music.play({
        loop: true,
        volume: 0.3
    });

    // Add event listener to the HTML speaker button
    speakerButtonElement.addEventListener('click', toggleMusic);

    // Load the map and set up the layers
    const map = this.make.tilemap({ key: "map", tileWidth: tileSize, tileHeight: tileSize });
    const tileset = map.addTilesetImage("map1", "battleCityField");

    // Create level layers
    toplayer = map.createLayer("toplayer", tileset, mapX, mapY);
    wallLayer = map.createLayer("wall", tileset, mapX, mapY);
    armorWallLayer = map.createLayer("armor_wall", tileset, mapX, mapY)
    eagleLayer = map.createLayer("eagle", tileset, mapX, mapY)

    // Set collision on the wall tiles. 
    // Assuming that tiles with IDs 1 and above are walls.
    wallLayer.setCollisionByExclusion([-1]); // Exclude the tile with ID -1 from collisions
    armorWallLayer.setCollisionByExclusion([-1]);
    eagleLayer.setCollisionByExclusion([-1]);

    // Set world bounds to match the field size
    this.physics.world.setBounds(mapX, mapY, mapWidth, mapHeight);

    // Create bullet group
    bullets = this.physics.add.group({
        defaulKey: "battlecitySprites",
        frame: 217,
        maxSize: 100,
    });

    // Create bullet animation
    this.anims.create({
        key: "bulletAnim",
        frames: this.anims.generateFrameNumbers("battleCitySprites", {
            start: 217,
            end: 217,
        }),
        frameRate: 10,
        repeat: -1,
    });
  
  // Create player tank
  createTank.call(this, 304, 204, 'player');
  createTank.call(this, 304, 204, 'enemy');

  // Enable cursor keys for player movement
  cursors = this.input.keyboard.createCursorKeys();
    fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Enable cursor keys for player movement
    cursors = this.input.keyboard.createCursorKeys();
}

// Toggle the music on and off
function toggleMusic() {
    if (music.isPlaying) {
        music.pause();
        speakerIconElement.src = '/assets/images/mute.png'; // Switch to the "off" icon
    } else {
        music.resume();
        speakerIconElement.src = 'assets/images/volume.png'; // Switch to the "on" icon
    }
}

// Update the game state
function update() {
    if (cursors.left.isDown) {
        moveTank('left', player);
    } else if (cursors.right.isDown) {
        moveTank('right', player);
    } else if (cursors.up.isDown) {
        moveTank('up', player);
    } else if (cursors.down.isDown) {
        moveTank('down', player);
    } else {
        player.setVelocity(0, 0); // Stop movement if no key is pressed
    }

  // handle firing when spacebar is pressed
  if (Phaser.Input.Keyboard.JustDown(fireKey)) {
    fireBullet();
  }

  if (enemies) {
    enemies.children.iterate(function (enemy) {
      // enemy.direction = 'right'
      moveTank('down', enemy)
    });
  }
}

// Function that handles shooting
function fireBullet() {
    const bullet = bullets.get();

    if (bullet) {
        console.log("Bullet obtained"); // Debug log
        console.log("Player direction:", player.direction); // Debug log
        bullet.setFrame(217);
        // Set bullet position
        switch (player.direction) {
            case "up":
                bullet.setPosition(player.x, player.y - 16);
                bullet.setVelocityY(-200);
                bullet.setVelocityX(0);
                break;
            case "down":
                bullet.setPosition(player.x, player.y + 16);
                bullet.setVelocityY(200);
                bullet.setVelocityX(0);
                break;
            case "left":
                bullet.setPosition(player.x - 16, player.y);
                bullet.setVelocityX(-200);
                bullet.setVelocityY(0);
                break;
            case "right":
                bullet.setPosition(player.x + 16, player.y);
                bullet.setVelocityX(200);
                bullet.setVelocityY(0);
                break;
        }

        // Activate bullet and make it visible
        bullet.setActive(true);
        bullet.setVisible(true);

        // Play the bullet animation
        bullet.anims.play("bulletAnim", true);
    }
}

function roundTo(value, step) {
    return Math.round(value / step) * step;
}

function moveTank(direction, tank) {
    let velocity = 70;
    let prefix = tank.type;
    switch (direction) {
        case 'left':
            tank.y = roundTo(tank.y, 4);
            tank.setVelocity(-velocity, 0);
            tank.anims.play(`${prefix}_moveLeft`, true);
            tank.direction = "left";
            break;
        case 'right':
            tank.y = roundTo(tank.y, 4);
            tank.setVelocity(velocity, 0);
            tank.anims.play(`${prefix}_moveRight`, true);
            tank.direction = "right";
            break;
        case 'up':
            tank.x = roundTo(tank.x, 4);
            tank.setVelocity(0, -velocity);
            tank.anims.play(`${prefix}_moveUp`, true);
            tank.direction = "up";
            break;
        case 'down':
            tank.x = roundTo(tank.x, 4);
            tank.setVelocity(0, velocity);
            tank.anims.play(`${prefix}_moveDown`, true);
            tank.direction = "down";
            break;
    }
}

/**
 * Create tank, add animation to this tank and set collision
 * Invoke in the create() using this syntax:
 * createTank.call(this, x, y, 'player)
 * @param {number} x x coordinate of the tank
 * @param {number} y y coordinate of the tank
 * @param {string} type ['player', 'enemy']
 */
function createTank(x, y, type) {
    let tank;
    if (type === 'player') {
        tank = createPlayerTank.call(this, x, y, type);
    } else {
        tank = createEnemyTank.call(this, x, y, type);
    }

    if (tank) {
      tank.type = type;
      setTankCollision.call(this, tank);
      setTankAnimation.call(this, `${tank.type}Sprites`, tank);
    }
}

/**
 * Create or return existing player player tank, add animation to this tank and set collision
 * Invoke in the create() using this syntax:
 * createPlayerTank.call(this, x, y, 'player)
 * @param {number} x x coordinate of the tank
 * @param {number} y y coordinate of the tank
 * @param {string} type default 'player'
 */
function createPlayerTank(x, y, type='player') {
    // Create the player if it doesn't exist
    if (player) return player;

    player = this.physics.add.sprite(x, y, `${type}Sprites`);
    return player;
}

/**
 * Create enemy tank, add animation to this tank and set collision
 * Invoke in the create() using this syntax:
 * createEnemyTank.call(this, x, y, 'player)
 * @param {number} x x coordinate of the tank
 * @param {number} y y coordinate of the tank
 * @param {string} type 
 */
function createEnemyTank(x, y, type) {
  // Create an enemy group if it doesn't exist
  if (!enemies) {
      enemies = this.physics.add.group();
  }

  // Create an enemy sprite and set its initial position
  const enemy = enemies.create(x, y, `${type}Sprites`);
  return enemy;
}

/**
 * Displays all frames of a given sprite and it indexes.
 * Useful for debugging and testing.
 * Invoke in the end of the create() using this syntax: 
 * showSpritesFrames.call(this, 'spriteName');
 * @param {string} spriteName - The name of the sprite.
 */
function showSpritesFrames(spriteName) {
    const texture = this.textures.get(spriteName);
    const frameNames = texture.getFrameNames();
    const totalFrames = frameNames.length;
    let x = 0;
    let y = 0;
    let shiftPosition = 16;
    for (let i = 0; i < totalFrames; i++) {
        this.add.image(x, y, spriteName, frameNames[i]).setOrigin(0, 0);
        this.add.text(x, y+shiftPosition, i.toString(), { fontSize: '8px', fill: '#f50505' }).setOrigin(0, 0);
        x += shiftPosition;
        if (x > 384) {
            x = 0;
            y += 2 * shiftPosition;
        }
    }
}

/**
 * Creates a spritesheet with a given range of frames.
 * Invoke in the preload() using this syntax: 
 * createSpriteSet.call(this, 'spriteName', startFrame, endFrame);
 * @param {string} spriteName - The name of the sprite.
 * @param {number} startFrame - The index of the first frame.
 * @param {number} endFrame - The index of the last frame.
 */
function createSpriteSet(spriteName, startFrame, endFrame) {
    this.load.spritesheet(
        spriteName,
        "assets/battle_city_spritesheet.png",
        {
        frameWidth: 16,
        frameHeight: 16,
        startFrame: startFrame,
        endFrame: endFrame,
        }
    );
}

/**
 * Set tank collision
 * Invoke in the create() using this syntax: 
 * setTankCollision.call(this, tank);
 */
function setTankCollision(tank){
  tank.setCollideWorldBounds(true);
  this.physics.add.collider(tank, wallLayer);
  this.physics.add.collider(tank, armorWallLayer);
  this.physics.add.collider(tank, eagleLayer);
}


/**
 * Set tank animation
 * Invoke in the create() using this syntax: 
 * setTankCollision.call(this, tank);
 */
function setTankAnimation(tankSprites, tank) {
  let prefix = tank.type;
  if (this.anims.exists(`${prefix}_moveUp`)) return;

  this.anims.create({
    key: `${prefix}_moveUp`,
    frames: this.anims.generateFrameNumbers(tankSprites, {
      start: 0,
      end: 1,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: `${prefix}_moveLeft`,
    frames: this.anims.generateFrameNumbers(tankSprites, {
      start: 2,
      end: 3,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: `${prefix}_moveDown`,
    frames: this.anims.generateFrameNumbers(tankSprites, {
      start: 4,
      end: 5,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: `${prefix}_moveRight`,
    frames: this.anims.generateFrameNumbers(tankSprites, {
      start: 6,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });
}