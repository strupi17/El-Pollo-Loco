class MovableObject {
  x = 120;
  y = 250;
  img;
  height = 150;
  width = 100;

  loadImage(path){
    this.img = new Image(); // this.img ist das gleiche wie document.getElementByID('image')
    this.img.src = path
  }

  moveRight() {
    console.log("Moving right");
  }
}
