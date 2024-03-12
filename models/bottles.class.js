class Bottles extends DrawableObject {
  y = 340;
  x = 0;
  height = 100;
  width = 100;

  constructor() {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = 400 + Math.random() * 2000;
  }
}