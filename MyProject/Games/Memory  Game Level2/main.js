
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

jQuery(document).ready(function ($) {
    async function main() {
        var loading = $("<div>").attr("id", "loading");
        $("body").append(loading);
        setTimeout(()=>{
            loading.hide();
        },1800)
        var presentationObj = new Presentation();
        var images = await presentationObj.displayImages();
        var root = $("#root");
        var time = $("<div>").addClass("timer");
        var hold = $("<div>").addClass("holder");
        var gameOverMsg = $("<div>").addClass("game-over").html("Game Over");
        root.append(time);
        root.append(hold);
        var holder = $(".holder");
        var items = images;
        var clickedItems = [];
        var clicks = 0;
        var end = 0;
        var time = 120;
        var opened = [];
        var timer = $(".timer");
        var playAgainBtn = $("<button>").html("Play Again").on("click", () => {
            location.reload();
        });
        var currentUser = JSON.parse(localStorage.getItem("current"));
        var displayUser = $("<div>").addClass("user-name").html(currentUser.name);
        var displayScore = $("<div>").addClass("user-score").html("Your score : " + currentUser.score);
        gameOverMsg.append(playAgainBtn);
        $("body").prepend(displayUser);
        $("body").prepend(displayScore);
        $("body").append(gameOverMsg);

        timer.text("START");
        var a = setInterval(function () {
            time--;
            if (time === 0) {
                currentUser.score -=2;
                localStorage.setItem("current" , JSON.stringify(currentUser)); 
                clearInterval(a);
                timer.text("GAME OVER");
                boxes.off();
                $(gameOverMsg).fadeIn(200);
            } else {
                timer.text("Hurry UP " + time + "s");
            }
        }, 1000)

        for (var i = 0; i < 36; i++) {
            var rand = getRandomNumber(0, items.length - 1);
            var boxes = $("<div>").addClass("boxes");
            var img = $("<img>").attr("src", items[rand]);
            var front = $("<div>").addClass("front-side");
            var back = $("<div>").addClass("back-side");
            back.append(img);
            boxes.append(front);
            boxes.append(back);
            holder.append(boxes);
            items.splice(rand, 1);
        }
        var boxes = $(".boxes");

        function start() {
            boxes.click(function () {
                $(".locked").off();
                clicks++;
                clickedItems.push($(event.currentTarget));
                $(event.currentTarget).off();
                $(event.currentTarget).find(".front-side").css("transform", "rotateX(180deg)");
                $(event.currentTarget).find(".back-side").css("transform", "rotateX(0deg)");
                if (clicks === 2) {
                    boxes.off();
                    if (clickedItems[0].html() === clickedItems[1].html()) {
                        opened.push(clickedItems[0]);
                        opened.push(clickedItems[1]);
                        clicks = 0;
                        clickedItems.length = 0;
                        end++;
                        for (var i = 0; i < opened.length; i++) {
                            $(opened[i]).attr("class", "locked");
                        }
                        if (end === 16) {
                            alert("CONGRATULATIONS LEVEL 2 DONE");
                            clearInterval(a);
                            currentUser.score += 4;
                            localStorage.setItem("current", JSON.stringify(currentUser));
                            timer.text("CONGRATULATIONS!");
                            setTimeout(() => {
                                location.reload();
                            }, 800)
                        }
                        start();
                    } else {
                        currentUser.score -= 4;
                        setTimeout(function () {
                            clickedItems[0].find('.front-side').css('transform', 'rotateX(0deg)');
                            clickedItems[0].find('.back-side').css('transform', 'rotateX(180deg)');
                            clickedItems[1].find('.front-side').css('transform', 'rotateX(0deg)');
                            clickedItems[1].find('.back-side').css('transform', 'rotateX(180deg)');
                            clickedItems.length = 0
                            clicks = 0;
                            start();
                        }, 600);

                    }
                }
            })
        }

        start();

    }
    main();

});










