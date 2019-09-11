
function BusinessLayer() {
    this.dataObj = new DataLayer();
    this.getAndResolveData = async () => {
        var images = [];
        for (var i = 0; i < 18; i++) {
            await this.dataObj.populateApiData();
            var data = this.dataObj.getApiData();
            images.push(data.message);
            images.push(data.message);
        }
        return images;
    }

}