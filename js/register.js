document.addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.querySelector("#username").value.trim();
    let email = document.querySelector("#email").value.trim();
    let password = document.querySelector("#password").value;
    let confirmpassword = document.querySelector("#confirmpassword").value;

    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    if (username.length < 6) {
        alert("Username must be at least 6 characters");
    } else if (password.length < 8) {
        alert("Password must be at least 8 characters");
    } else if (!password.match(lowerCaseLetter)) {
        alert("Password must contain lowercase letter");
    } else if (!password.match(upperCaseLetter)) {
        alert("Password must contain uppercase letter");
    } else if (!password.match(numbers)) {
        alert("Password must contain a number or special character");
    } else if (password !== confirmpassword) {
        alert("Password is not confirmed correctly");
    } else {
        let users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[username]) {
            alert("Username is exits...");
        } else {
            users[username] = {
                username: username,
                password: password,
            };

            localStorage.setItem("users", JSON.stringify(users));

            alert("Register successfully!");
            window.location.href = "/login.html";
        }
    }
});
