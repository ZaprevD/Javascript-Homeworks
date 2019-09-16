
function Presentation() {
    this.businessObj = new BusinessLayer();
    this.imagesLev1 = [];
    this.imagesLev2 = [];
    
    this.displayImagesLev1 = async () => {
        this.imagesLev1 = await this.businessObj.getImagesLevel1();
        console.log(this.imagesLev1);
        return this.imagesLev1;
    }

    this.displayImagesLev2 = async () => {
        this.imagesLev2 = await this.businessObj.getImagesLevel2();
        return this.imagesLev2;
    }
}

