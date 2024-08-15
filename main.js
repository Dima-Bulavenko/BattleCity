const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }, // No gravity needed for a top-down game
      debug: false, // Set to true if you want to see the collision boxes
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// Create the Phaser game instance
const game = new Phaser.Game(config);

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

  // Load the field image
  this.load.image("battleCityField", "assets/battle_city_stage_01.png");
}

var player;
var cursors;
var bullets;
var fireKey;

// Create game objects
function create() {
  // Add the field image to the scene and set its position
  const field = this.add.image(400, 300, "battleCityField");

  // Calculate the world bounds based on the field's size and position
  const fieldWidth = 208;
  const fieldHeight = 208;
  const fieldX = 400 - fieldWidth / 2;
  const fieldY = 300 - fieldHeight / 2;

  // Create animations for each direction
  this.anims.create({
    key: "moveUp",
    frames: this.anims.generateFrameNumbers("battleCitySprites", {
      start: 0,
      end: 1,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "moveLeft",
    frames: this.anims.generateFrameNumbers("battleCitySprites", {
      start: 2,
      end: 3,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "moveDown",
    frames: this.anims.generateFrameNumbers("battleCitySprites", {
      start: 4,
      end: 5,
    }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "moveRight",
    frames: this.anims.generateFrameNumbers("battleCitySprites", {
      start: 6,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });

  // Create bullet animation
  this.anims.create({
    key: "bulletAnim",
    frames: this.anims.generateFrameNumbers("battleCitySprites", {
      start: 15,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Create bullet group
  bullets = this.physics.add.group({
    defaulKey: "battlecitySprites",
    frame: 15,
    maxSize: 10,
  });

  fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  // Create the player sprite and set its initial position
  player = this.physics.add.sprite(100, 100, "battleCitySprites");

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
    player.anims.play("moveUp", true);
    player.direction = "up";
  } else if (cursors.down.isDown) {
    player.setVelocityY(100);
    player.anims.play("moveDown", true);
    player.direction = "down";
  } else if (cursors.left.isDown) {
    player.setVelocityX(-100);
    player.anims.play("moveLeft", true);
    player.direction = "left";
  } else if (cursors.right.isDown) {
    player.setVelocityX(100);
    player.anims.play("moveRight", true);
    player.direction = "right";
  } else {
    player.anims.stop();
  }

  // handle firing when spacebar is pressed
  if (Phaser.Input.Keyboard.JustDown(fireKey)) {
    fireBullet();
  }
}

// function that handles shooting
function fireBullet() {
  const bullet = bullets.get();

  if (bullet) {
    console.log("Bullet obtained"); // Debug log
    console.log("Player direction:", player.direction); // Debug log
    bullet.setFrame(15);
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
