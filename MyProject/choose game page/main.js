function main() {
    var gameObj = new GameList();

    if (JSON.parse(localStorage.getItem("current"))) {
        gameObj.displayList();
    } else {
        var logInMsg = $("<div>").html("You must be logged in to access this page").addClass("login-msg");
        $("body").append(logInMsg);
    }
}
main();