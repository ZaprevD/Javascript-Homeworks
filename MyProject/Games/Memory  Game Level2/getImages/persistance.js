
function ImagesApi() {

    this.getImagesData = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:
                    "https://dog.ceo/api/breeds/image/random",
                //link do APIto
                type: "GET",
                success: function (data) {
                    //ako uspesno sme dobile response od APIto praime resolve na Promise
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    };


}