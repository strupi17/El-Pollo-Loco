class MovableObject extends DrawableObject{
  speed = 0.15;
  otherDiretion = false;
  speedY = 0;
  accelration = 2.5;
  energy = 100;
  lastHit = 0;
  groundY = 180;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < this.groundY;
  }

  isColliding(mo){
    return this.x + this.width > mo.x && 
    this.y + this.height > mo.y && 
    this.x < mo.x &&
    this.y < mo.y + mo.height;
  }

  hit(){
    this.energy -= 2.5;
    if(this.energy < 0){
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead(){
    return this.energy == 0;
  }

  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 1000;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
