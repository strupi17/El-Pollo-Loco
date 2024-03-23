class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthStatusBar = new HealthStatusBar();
  coinsStatusBar = new CoinsStatusBar();
  bottlesStatusBar = new BottlesStatusBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 100);
  }

  checkCollisions() {
    this.checkCollisionsWithEnemys();
    this.checkCollisionsWithCoins();
    this.checkCollisionsWithBottles();
    this.checkCollisionsBottlesWithEnemys();
  }

  checkCollisionsWithEnemys() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if(this.character.isAboveGround() && this.character.speedY < 0){
          if(!enemy.isDead()){
            this.character.speedY = 10;
          }
          enemy.kill();
        }
        if(!enemy.isDead()){
          this.character.hit();
        }
        this.healthStatusBar.setPercentage(this.character.energy, this.healthStatusBar.HEALTH_IMAGES);
      }
    });
  }

  checkCollisionsWithCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.character.collectCoins();
        this.coinsStatusBar.setPercentage(this.character.coins, this.coinsStatusBar.COIN_IMAGES);
      }
    });
  }

  checkCollisionsWithBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(index, 1);
        this.character.collectBottels();
        this.bottlesStatusBar.setPercentage(this.character.bottles, this.bottlesStatusBar.BOTTLE_IMAGES);
      }
    });
  }

  checkCollisionsBottlesWithEnemys(){
    this.throwableObjects.forEach((to) => {
      this.level.enemies.forEach((enemy, index) => {
        if(to.isColliding(enemy)){
          this.level.enemies[index].kill();
          // this.throwableObjects.splice(0, 1);
        }
      })
    })
  }

  checkThrowObjects() {
    if (this.keyboard.SPACE) {
      if (this.character.bottles > 0) {
        let bottle = new ThrowableObject(this.character.x, this.character.y);
        this.throwableObjects.push(bottle);
        this.character.bottles -= 10;
        this.bottlesStatusBar.setPercentage(this.character.bottles, this.bottlesStatusBar.BOTTLE_IMAGES);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    // Fixt Objects
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthStatusBar);
    this.addToMap(this.coinsStatusBar);
    this.addToMap(this.bottlesStatusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDiretion) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDiretion) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
