function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function Presentation() {
    this.businessObj = new BusinessLayer();
    this.images = {};
    this.displayImages = async () => {
        this.images = await this.businessObj.getAndResolveData();
        return this.images;
    }

}