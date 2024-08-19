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

    // Load bullet spriteset
    this.load.spritesheet("bulletSprites", "assets/tiles.png", {
        frameWidth: 8,
        frameHeight: 8,
        startFrame: 9,
        endFrame: 9, 
    });

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
  
  // Create player tank
  createTank.call(this, 304, 204, 'player');
  createTank.call(this, 304, 204, 'enemy');

  // Enable cursor keys for player movement
  cursors = this.input.keyboard.createCursorKeys();
    fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Enable cursor keys for player movement
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, enemies, handleCollision, null, this);
    this.physics.add.collider(enemies, enemies, handleCollision, null, this);
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
    fireBullet.call(this, player);
  }

  if (enemies) {
    enemies.children.iterate(function (enemy) {
      moveTank(enemy.direction, enemy)
    });
  }
}

function fireBullet(tank) {
    // Check if the tank already has an active bullet
    if (tank.activeBullet) {
        return; // Exit if there is already an active bullet
    }
    
    const bullet = createBullet.call(this);
    if (bullet) {
        tank.activeBullet = bullet; // Set the active bullet
        switch (tank.direction) {
            case "up":
                bullet.setPosition(tank.x, tank.y);
                bullet.setVelocityY(-200);
                break;
            case "down":
                bullet.setPosition(tank.x, tank.y);
                bullet.setVelocityY(200);
                break;
            case "left":
                bullet.setPosition(tank.x, tank.y);
                bullet.setVelocityX(-200);
                break;
            case "right":
                bullet.setPosition(tank.x, tank.y);
                bullet.setVelocityX(200);
                break;
        }
        // Listen for when the bullet is destroyed
        bullet.on('destroy', () => {
            tank.activeBullet = null; // Allow the tank to fire again
        });
    }
}

// Function that handles bullet collision
function setBulletCollision() {
  this.physics.add.collider(bullets, wallLayer, bulletHitsWall, null, this);
  this.physics.add.collider(bullets, armorWallLayer, bulletHitsWall, null, this);
  this.physics.add.collider(bullets, eagleLayer, bulletHitsEagle, null, this);
    //   // Add collision detection between bullets and tanks
    //   this.physics.add.collider(bullets, player, bulletHitsTank, null, this);
      this.physics.add.collider(bullets, enemies, bulletHitsTank, null, this);
}


function bulletHitsTank(bullet, tank) {
    if (bullet) {
        console.log("Bullet exists, destroying bullet:", bullet);
        bullet.destroy(); // If this line is uncommented error comes up
    } else {
        console.error("Bullet is undefined");
    }

    if (tank) {
        console.log("Tank exists, destroying tank:", tank);
        tank.destroy();
    } else {
        console.error("Tank is undefined");
    }
}

// Function to ensure bullet is destroyed after collision
function bulletHitsWall(bullet, tile) {
  bullet.destroy();
  wallLayer.removeTileAt(tile.x, tile.y);
}

function bulletHitsEagle(bullet, tile) {
    bullet.destroy();
}

function roundTo(value, step) {
    return Math.round(value / step) * step;
}

function moveTank(direction, tank) {
    let velocity = 70;
    let prefix = tank.type;

    // Check for potential collision in the direction of movement
    if (tank.collisionDirection === direction) {
        tank.setVelocity(0, 0);
        return;
    }

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
    player.health = 3;
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
  changeEnemyDirectionRandomly.call(this, enemy)
  enemy.health = 1;
  return enemy;
}

function createBullet() {
    if (!bullets) {
       bullets = this.physics.add.group();
        setBulletCollision.call(this, bullets);
    }
   const bullet = bullets.create(100, 100, "bulletSprites");
   // Set bullet collision with world bounds
   bullet.setCollideWorldBounds(true);
   // Destroy the bullet when it collides with world bounds
   bullet.body.onWorldBounds = true;
   this.physics.world.on('worldbounds', (body) => {
       if (body.gameObject === bullet) {
           bullet.destroy();
       }
   });

   return bullet;
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

function handleCollision(tank1, tank2) {
    const direction = getCollisionDirection(tank1, tank2);
    tank1.collisionDirection = direction;
    tank2.collisionDirection = getOppositeDirection(direction); 

    // Clear existing timeout if it exists
    if (tank1.collisionTimeout) {
        clearTimeout(tank1.collisionTimeout);
    }
    if (tank2.collisionTimeout) {
        clearTimeout(tank2.collisionTimeout);
    }

    // Set a new timeout to reset the collision direction
    tank1.collisionTimeout = setTimeout(() => {
        tank1.collisionDirection = null;
        tank1.collisionTimeout = null;
    }, 300); // Adjust the delay as needed

    tank2.collisionTimeout = setTimeout(() => {
        tank2.collisionDirection = null;
        tank2.collisionTimeout = null;
    }, 300); // Adjust the delay as needed
}

// Get collision direction to the first tank
function getCollisionDirection(tank1, tank2) {
    const dx = tank1.x - tank2.x;
    const dy = tank1.y - tank2.y;

    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal collision
        if (dx > 0) {
            return 'left';
        } else {
            return 'right';
        }
    } else {
        // Vertical collision
        if (dy > 0) {
            return 'up';
        } else {
            return 'down';
        }
    }
}

// Get collision direction for the second tank
function getOppositeDirection(direction) {
    switch (direction) {
        case 'left': return 'right';
        case 'right': return 'left';
        case 'up': return 'down';
        case 'down': return 'up';
    }
}
/**
 * function that handles enemy and player tank collision
 * **/ 
function playerEnemyCollide(player, enemy) {
    // Stop movement for both tanks
    player.setVelocity(0);
    
    console.log("tanks collide");

    if(enemy.active) {
        enemy.setVelocity(0);
    }
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

// Function to generate a random delay between min and max milliseconds
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to change enemy direction and reset the timer with a new random delay
function changeEnemyDirectionRandomly(enemy) {
    changeEnemyDirection(enemy); // Change the enemy's direction
    // Reset the timer with a new random delay
    const minDelay = 1000;
    const maxDelay = 2000;
    this.time.addEvent({
        delay: getRandomDelay(minDelay, maxDelay),
        callback: changeEnemyDirectionRandomly,
        callbackScope: this,
        loop: false, // Do not loop, we'll manually reset it
        args: [enemy]
    });
}

// Change enemy direction randomly
function changeEnemyDirection(enemy) {
    const directions = ['up', 'down', 'left', 'right'];
    const newDirection = Phaser.Math.RND.pick(directions);
    enemy.direction = newDirection;
}