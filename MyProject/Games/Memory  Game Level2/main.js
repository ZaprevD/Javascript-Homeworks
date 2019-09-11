

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
        var itemArr = images;
        var savedArr = [];
        var clicks = 0;
        var kraj = 0;
        var time = 120;
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
                currentUser.score -=1;
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
            var rand = getRandomNumber(0, itemArr.length - 1);
            var boxes = $("<div>").addClass("boxes");
            var img = $("<img>").attr("src", itemArr[rand]);
            var front = $("<div>").addClass("front");
            var back = $("<div>").addClass("back");
            back.append(img);
            boxes.append(front);
            boxes.append(back);
            holder.append(boxes);
            itemArr.splice(rand, 1);
        }
        var boxes = $(".boxes");

        function start() {
            boxes.click(function () {
                savedArr.push($(this));
                $(this).off();
                $(this).find(".front").css("transform", "perspective(900px) rotateX(180deg)");
                $(this).find(".back").css("transform", "perspective(900px) rotateX(0deg)");
                clicks++;
                if (clicks === 2) {
                    boxes.off();
                    if (savedArr[0].html() === savedArr[1].html()) {
                        clicks = 0;
                        savedArr.length = 0;
                        kraj++;
                        if (kraj === 16) {
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
                        setTimeout(function () {
                            savedArr[0].find('.front').css('transform', 'perspective(900px) rotateX(0deg)');
                            savedArr[0].find('.back').css('transform', 'perspective(900px) rotateX(180deg)');
                            savedArr[1].find('.front').css('transform', 'perspective(900px) rotateX(0deg)');
                            savedArr[1].find('.back').css('transform', 'perspective(900px) rotateX(180deg)');
                            savedArr.length = 0
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










