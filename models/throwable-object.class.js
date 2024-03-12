class ThrowableObject extends MovableObject {
  otherDiretion = world.character.otherDiretion;
  ROTATION_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.ROTATION_BOTTLE);
    this.x = x + 50;
    this.y = y + 100;
    this.height = 100;
    this.width = 100;
    this.trow();
  }

  trow(x, y) {
    this.speedY = 30;
    this.speed = 5;
    this.groundY = 500;
    this.applyGravity();
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (this.otherDiretion) {
        this.moveLeft();
      } else {
        this.moveRight();
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.ROTATION_BOTTLE);
    }, 100);
  }
}
