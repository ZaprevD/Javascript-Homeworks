
function DataLayer(){
    this.apiData = {};
    this.persistanceObj = new ImagesApi();
    this.populateApiData = async () => {
        this.apiData =  await this.persistanceObj.getImagesData();
    }

    this.getApiData = () => {
        return this.apiData;
    }

}