class MovableObject {
  img;
  x = 120;
  y = 280;
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
