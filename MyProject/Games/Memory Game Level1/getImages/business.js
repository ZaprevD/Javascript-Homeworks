
function BusinessLayer() {
    this.dataObj = new DataLayer();
    this.getAndResolveData = async () => {
        var images = [];
        for (var i = 0; i < 8; i++) {
            await this.dataObj.populateApiData();
            var data = this.dataObj.getApiData();
            var tempObj = {
                image: data.message
            }
            images.push(data.message);
            images.push(data.message);
        }
        return images;
    }

}