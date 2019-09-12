
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
$(document).ready(function () {

    //HTML
    var currentUser = JSON.parse(localStorage.getItem("current"));

    var y = 0;
    var root = $("#root");
    var displayUser = $("<div>").addClass("user-name").html(currentUser.name);
    var displayScore = $("<div>").addClass("user-score").html("Your score : " + currentUser.score);
    var hangmanHolder = $("<div>").addClass("holder");
    var imageHolder = $("<div>").addClass("image-holder");
    var hangmanImage = $("<img>").attr("src", y + ".jpg");
    var wordHolder = $("<div>").addClass("word-holder");
    var description = $("<h2>");
    var keyboardHolder = $("<div>").addClass("keyboard-holder");
    var keyword = $("<div>").addClass("keyword");
    var gameOverMsg = $("<div>").attr("id", "game-over").html("Game Over");

    var winnerMsg = $("<div>").addClass("winner-msg").html("Winner");
    var message = $("<p>").html("(+2) Points")
    var playAgainBtn = $("<button>").html("Play Again").on("click", () => {
        setTimeout(() => {
            location.reload()
        }, 500)
    });
    var playAgainBtn2 = $("<button>").html("Play Again").on("click", () => {
        setTimeout(() => {
            location.reload()
        }, 500)
    });


    function makeHtml() {
        $("body").prepend(displayUser);
        $("body").prepend(displayScore);
        $("body").append(winnerMsg);
        gameOverMsg.append(playAgainBtn);
        $(imageHolder).append(hangmanImage);
        winnerMsg.append(message);
        winnerMsg.append(playAgainBtn2);
        $(hangmanHolder).append(imageHolder);
        $(wordHolder).append(description);
        $(wordHolder).append(keyword);
        $(wordHolder).append(keyboardHolder);
        $(hangmanHolder).append(wordHolder);
        $(root).append(hangmanHolder);
        $("body").append(gameOverMsg);
    }
    makeHtml();

    //GAME
    function game() {
        let keyboard = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l",
            "z", "x", "c", "v", "b", "n", "m"];
        let questions = ["Italian Football Team",
            "Capital city of Russia", "Biggest city of Macedonia", "The Fear of Heights",
            "Type of sport", "Water in Latin language"];

        let answers = ["juventus", "moscow", "skopje", "acrophobia", "hockey", "aqua"];

        // ADDING BUTTONS ON THE KEYBOARD
        for (var i = 0; i < keyboard.length; i++) {
            var buttons = $("<button>").html(keyboard[i]).addClass("btns");
            $(keyboardHolder).append(buttons);
        }

        var randomWord = getRandomNumber(0, answers.length - 1);
        description.html(questions[randomWord]);
        var fullKeyword = answers[randomWord].split("");
        var test = 1;
        $(keyword).html($(keyword).html() + fullKeyword[0]);
        for (var i = 1; i < fullKeyword.length; i++) {
            var ltt = $("<div>").addClass("show");
            var hide = $("<div>").addClass("hiden-div");
            ltt.append(hide);
            $(hide).html(fullKeyword[i]);
            $(keyword).append(ltt);
        }
        //EVENTS
        $(".btns").on("click", (event) => {
            var hiden = $(".hiden-div");
            for (var i = 0; i < fullKeyword.length; i++) {
                if ($(event.target).html() === ($(hiden[i]).html())) {
                    $(hiden[i]).attr("class", "");
                    test++
                }
            }
            if (test === fullKeyword.length) {
                currentUser.score += 2;
                localStorage.setItem("current", JSON.stringify(currentUser));
                setTimeout(function () {
                    winnerMsg.fadeIn(200);
                    $(".btns").off();
                }, 500)
            }
            if (!answers[randomWord].includes($(event.target).html())) {
                y++
                $(hangmanImage).attr("src", y + ".jpg");
                if (y === 4) {
                    $(".btns").off();
                    hiden.attr("class", "");
                    currentUser.score -= 1;
                    localStorage.setItem("current", JSON.stringify(currentUser));
                    setTimeout(function () {
                        $("#game-over").fadeIn(800);
                        hiden.attr("class", "");
                    }, 500)
                }
            }
        });

    }
    game();
})