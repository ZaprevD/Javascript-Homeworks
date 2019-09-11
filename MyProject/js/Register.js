function hasNumbers(t) {
    return /\d/.test(t);
}
function RegisterPage() {
    this.currentUser = {};
    this.displayRegisterPage = () => {
        var body = $("body");
        var header = $("<div>").addClass("header");
        var headerH1 = $("<h1>").html("A LOT OF GAMES!");
        $(header).append(headerH1);
        var main = $("<div>").addClass("main");
        body.append(header);
        body.append(main);
        var box60 = $("<div>").addClass("box-60");
        var box40 = $("<div>").addClass("box-40");
        var signUp = $("<h1>").addClass("signup").html("Sign UP!");
        var signIn = $("<h2>").addClass("signin").html("Sign IN!");
        var formDiv = $("<div>").addClass("register");
        var registerError = $("<div>").addClass("reg-error");
        var registerUserName = $("<input>").attr("placeholder", "Username");
        var registerPassword = $("<input type='password'>").attr("placeholder", "Password");
        var registerEmail = $("<input>").attr("placeholder", "E-mail");
        var registerBtn = $("<button>").text("Register");
        var loginDiv = $("<div>").addClass("login");
        var userLogin = $("<input>").attr("placeholder", "Username");
        var userPassword = $("<input type='password'>").attr("placeholder", "Password");
        var logInBtn = $("<button>").text("Sign In");
        var message = $("<div>").attr("id", "popup-msg").html("Registration Successful");
        var errorMsg = $("<div>").html("Invalid Username or Password").attr("id", "error-msg");

        $("body").append(message);
        $(box40).append(signIn);
        $(box40).append(loginDiv);
        $(loginDiv).append(userLogin);
        $(loginDiv).append(userPassword);
        $(loginDiv).append(logInBtn);
        $(box40).append(errorMsg);
        $(box60).append(signUp);
        $(formDiv).append(registerUserName);
        $(formDiv).append(registerPassword);
        $(formDiv).append(registerEmail);
        $(formDiv).append(registerBtn);
        $(formDiv).append(registerError);
        $(box60).append(formDiv);
        $(main).append(box60);
        $(main).append(box40);



        // IS USER LOGGED IN
        if (localStorage.getItem("current")) {
            var userName = $("<div>").html("Logged in as: " + JSON.parse(localStorage.getItem("current")).name).attr("id", "logged-user");
            var logoutBtn = $("<button>").html("Log out").attr("id", "log-outBtn");
            var continueBtn = $("<div>").html("Continue").attr("id", "continue").on("click", () => {
                window.location = "choose game page/index.html"
            });
            $("body").prepend(logoutBtn);
            $("body").prepend(userName);
            box40.hide();
            box60.hide();
            body.append(continueBtn);
            logoutBtn.on("click", () => {
                localStorage.removeItem("current");
                location.reload();
            })
        }
        // EVENTS 
        $(registerBtn).on("click", () => {
            if (validation()) {
                registerUser();
            }
        })

        $(logInBtn).on("click", () => {
            if (JSON.parse(localStorage.getItem("users"))) {
                var users = JSON.parse(localStorage.getItem("users"));
                for (var i = 0; i < users.length; i++) {
                    if (users[i].name === userLogin.val() && users[i].password === userPassword.val()) {
                        $("#error-msg").fadeOut(50);
                        this.currentUser = users[i];
                        localStorage.setItem("current", JSON.stringify(this.currentUser));
                        window.location = "choose game page/index.html"
                        break;
                    }
                }
            }
            setTimeout(() => {
                $("#error-msg").fadeIn(100);
            }, 800)
        });

        //VALIDATION
        function validation() {
            var provider = $(registerEmail).val().substr($(registerEmail).val().indexOf("@") + 1, $(registerEmail).val().lastIndexOf("."));
            var domain = $(registerEmail).val().substr($(registerEmail).val().lastIndexOf(".") + 1)
            if ($(registerUserName).val() === "" || $(registerUserName).val().length < 3) {
                registerError.html("USERNAME MUST BE MORE THAN 2 LETTERS");
                registerError.fadeIn(100);
                $(registerUserName).val("").focus();
                return false
            } else if ($(registerPassword).val().length < 5) {
                registerError.html("PASSWORD MUST BE MORE THAN 4 LETTERS");
                registerError.fadeIn(100);
                $(registerPassword).val("").focus();
                return false
            } else if ($(registerEmail).val().includes("@") && (registerEmail).val().includes(".") && $(registerEmail).val() !== "") {
                if ((hasNumbers(provider)) || hasNumbers(domain) || (domain.length !== 3)) {
                    registerError.html("CHECK THE DOMAIN OR THE PROVIDER!");
                    registerError.fadeIn(100);
                    $(registerEmail).val("").focus();
                    return false;
                }
            } else {
                registerError.html("!EMAIL!");
                registerError.fadeIn(100);
                return false;
            }
            registerError.html("");
            registerError.fadeOut(100);
            return true;
        }

        //REGISTER NEW USER
        function registerUser() {
            var userName = registerUserName.val();
            var password = registerPassword.val();
            var email = registerEmail.val();
            var user1 = new User(userName, password, email);
            var users = JSON.parse(localStorage.getItem("users"));
            registerUserName.val("");
            registerPassword.val("");
            registerEmail.val("");
            if (users === null) {
                var niza = [];
                niza.push(user1);
                $("#popup-msg").fadeIn(100);
                setTimeout(() => {
                    $("#popup-msg").fadeOut(1000);
                }, 1000)
                localStorage.setItem("users", JSON.stringify(niza));
            } else {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].name === user1.name) {
                        registerError.html("Username already exist");
                        registerError.fadeIn(100);
                        return;
                    }
                }
                users.push(user1);
                $("#popup-msg").fadeIn(100);
                setTimeout(() => {
                    $("#popup-msg").fadeOut(1000);
                }, 1000)
                localStorage.setItem("users", JSON.stringify(users));
                registerUserName.val("");
                registerPassword.val("");
                registerEmail.val("");
            }
        }
    }
}