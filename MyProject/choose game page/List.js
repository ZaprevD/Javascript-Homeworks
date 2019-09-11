
function GameList() {
    this.regObj = new RegisterPage();
    this.displayList = () => {
        var root = $("#root");
        var loggedUser = JSON.parse(localStorage.getItem("current"));
        var displayUser = $("<div>").addClass("user-info").html("Logged in as: " + loggedUser.name);
        var displayScore = $("<div>").addClass("user-score").html("Your score : " + loggedUser.score);
        var firstGame = $("<div>").html("Memory Game Level 1").addClass("game");
        var secondGame = $("<div>").html("Memory Game Level 2").addClass("game");
        var thirdGame = $("<div>").html("Hangman").addClass("game");
        var loading = $("<div>").attr("id", "loading");
        var logOutBtn = $("<button>").html("Log out").attr("id", "log-out").on("click", () => {
            localStorage.removeItem("current");
            window.location = "../index.html";
        });

        //UPDATING SCORE
        var allUsers = JSON.parse(localStorage.getItem("users"));
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i].name === loggedUser.name) {
                var index = allUsers.indexOf(allUsers[i]);
                allUsers.splice(index, 1);
                allUsers.push(loggedUser);
                localStorage.setItem("users", JSON.stringify(allUsers));
                break;
            }
        }
        $("body").append(loading);
        $("body").prepend(logOutBtn);
        $("body").prepend(displayUser);
        $("body").prepend(displayScore);

        root.append(firstGame);
        root.append(secondGame);
        root.append(thirdGame);


        //EVENTS
        firstGame.on("click", () => {
            $("#loading").fadeIn(50)
            $(".game").hide();
            setTimeout(() => {
                $("#loading").fadeOut(50);
            }, 1000);
            setTimeout(() => {
                window.location = "../Games/Memory Game Level1/index.html";
            }, 1100)
        });

        secondGame.on("click", () => {
            $("#loading").fadeIn(50)
            $(".game").hide();
            setTimeout(() => {
                $("#loading").fadeOut(50);
            }, 1000);
            setTimeout(() => {
                window.location = "../Games/Memory  Game Level2/index.html";
            }, 1100)
        });

        thirdGame.on("click", () => {
            $("#loading").fadeIn(50)
            $(".game").hide();
            setTimeout(() => {
                $("#loading").fadeOut(50);
            }, 1000);
            setTimeout(() => {
                window.location = "../Games/Hangman/index.html";
            }, 1100)
        });
    }
}