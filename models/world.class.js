class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld(){
    this.character.world = this;
  }

  run(){
    setInterval(() => {
      this.chechCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  chechCollisions(){
    this.level.enemies.forEach((enemy) => {
      if(this.character.isColliding(enemy)){
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy)
        // console.log('collision with Charecter', this.character.energy);
      }
     });
  }

  checkThrowObjects(){
    if(this.keyboard.D){
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.throwableObjects.push(bottle)
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    // Fixt Objects
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
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
    if(mo.otherDiretion){
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if(mo.otherDiretion){
      this.flipImageBack(mo);
    }
  }

  flipImage(mo){
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo){
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
