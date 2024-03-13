class StatusBar extends DrawableObject{
    percentage = 100;
    x = 30;
    height = 60;
    width = 200;
    constructor(){
        super();
    }

    setPercentage(percentage, IMAGES){
        this.percentage = percentage;
        let path = IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage){
        if(percentage == 100) {
            return 5;
        } else if (percentage > 80){
            return 4;
        } else if (percentage > 60){
            return 3;
        } else if (percentage > 40){
            return 2;
        } else if (percentage > 20){
            return 1;
        } else {
            return 0;
        }
    }
}