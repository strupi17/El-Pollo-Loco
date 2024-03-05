class BackgroundObject extends MovableObject {
    	
    width = 720;
    height = 480;
    y = 0;
    constructor(ImagePath, x){
        super().loadImage(ImagePath);
        this.x = x;
    }
}