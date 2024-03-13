class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  coins = 0;
  bottles = 0;

  loadImage(path) {
    this.img = new Image(); // this.img ist das gleiche wie document.getElementByID('image')
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
 
  collectCoins(){
    if(this.coins < 100){
      this.coins += 10;
    }
  }

  collectBottels(){
    if(this.bottles < 100){
      this.bottles += 10;
    }
  }

}
