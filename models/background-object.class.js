class BackgroundObject extends MovableObject {
    	
    width = 720;
    height = 400;
    constructor(ImagePath, x){
        super().loadImage(ImagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}