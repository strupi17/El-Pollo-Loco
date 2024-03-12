class Coins extends DrawableObject {
  y = 300;
  x = 200;
  height = 150;
  width = 150;

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 400 + Math.random() * 500;
  }
}
