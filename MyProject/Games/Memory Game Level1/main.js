function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(document).ready(function () { //jQuery
    async function main() {
        var loading = $("<div>").attr("id", "loading");
        $("body").append(loading);
        setTimeout(()=>{
            loading.hide();
        },900);
        var presentationObj = new Presentation();
        var images = await presentationObj.displayImages();
        var currentUser = JSON.parse(localStorage.getItem("current"));
        var root = $("#root");
        var gameHolder = $("<div>").addClass("game-holder");
        $(root).append(gameHolder);
        var displayUser = $("<div>").addClass("user-name").html(currentUser.name);
        var displayScore = $("<div>").addClass("user-score").html("Your score : " + currentUser.score);
        var items = images;
        var opened = [];
        var clickedItems = [];
        var clicks = 0;
        var end = 0;
        $("body").prepend(displayUser);
        $("body").prepend(displayScore);
        //CREATING BOXES
        for (var i = 0; i < 16; i++) {
            var randomNumber = getRandomNumber(0, items.length - 1);
            var boxes = $("<div>").addClass("boxes");
            var frontSide = $("<div>").addClass("front-side");
            var img = $("<img>").attr("src", items[randomNumber]);
            var backSide = $("<div>").addClass("back-side");
            backSide.append(img);
            items.splice(randomNumber, 1);
            $(boxes).append(backSide);
            $(boxes).append(frontSide);
            $(gameHolder).append(boxes);
        }

        var boxes = $(".boxes");
        //EVENTS
        function game() {
            $(boxes).on("click", (event) => {
                clicks++;
                $(".locked").off();
                $(event.currentTarget).off();
                clickedItems.push($(event.currentTarget));
                $(event.currentTarget).find(".front-side").css("transform", "rotateX(180deg)");
                $(event.currentTarget).find(".back-side").css("transform", "rotateX(0deg)");
                if (clicks === 2) {
                    $(boxes).off();
                    if (clickedItems[0].html() === clickedItems[1].html()) {
                        opened.push(clickedItems[0]);
                        opened.push(clickedItems[1]);
                        clicks = 0;
                        clickedItems.length = 0;
                        end++;
                        for (var i = 0; i < opened.length; i++) {
                            $(opened[i]).attr("class", "locked");
                        } if (end === 8) {
                            currentUser.score += 2;
                            localStorage.setItem("current", JSON.stringify(currentUser));
                            setTimeout(() => {
                                alert("Winner");
                                location.reload();
                            }, 800)
                        } else {
                            game();
                        }

                    } else {
                        setTimeout(function () {
                            clickedItems[0].find(".back-side").css("transform", "rotateX(180deg)");
                            clickedItems[0].find(".front-side").css("transform", "rotateX(0deg)");
                            clickedItems[1].find(".back-side").css("transform", "rotateX(180deg)");
                            clickedItems[1].find(".front-side").css("transform", "rotateX(0deg)");
                            clickedItems.length = 0;
                            clicks = 0;
                            game();
                        }, 600);
                    }
                }
            });

        }

        game();


    }
    main();

})



