document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");
    let isLogin = document.querySelector(".islogin");
    let notLogin = document.querySelector(".notlogin");
    let avatar = document.querySelector(".avatar");
    let logout = document.querySelector(".logout");

    if (loggedInUser) {
        isLogin.classList.remove("hidden");
        notLogin.classList.add("hidden");
        avatar.innerHTML = "Xin chao: " + loggedInUser;
    } else {
        isLogin.classList.add("hidden");
        notLogin.classList.remove("hidden");
        alert("you is not login, please login now! 🤦‍♀️");
    }

    logout.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
    });
});
