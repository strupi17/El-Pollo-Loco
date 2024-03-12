class ThrowableObject extends MovableObject {
    ROTATION_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    constructor(x, y){
        super();
        this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.loadImages(this.ROTATION_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.trow();
    }

    trow(x, y){
        this.speedY = 20;
        this.speed = 1;
        this.groundY = 320;
        this.applyGravity();
        this.animate();
    }
    animate() {
        setInterval(() => {
          this.moveRight();
        }, 1000 / 60);
        
        setInterval(() => {
          this.playAnimation(this.ROTATION_BOTTLE);
        }, 50);
      }
}