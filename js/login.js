document.addEventListener("submit", function (e) {
    e.preventDefault();

    let storedUsers = JSON.parse(localStorage.getItem("users"));

    let username = document.querySelector("#username").value.trim();
    let password = document.querySelector("#password").value;
    console.log();

    if (storedUsers[username] && storedUsers[username].password === password) {
        localStorage.setItem("loggedInUser", username);

        let timerInterval;
        Swal.fire({
            title: "Đăng nhập thành công!",
            icon: "success",
            html: "Tự động chuyển về trang chủ sau <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            },
        }).then((result) => {
            window.location.href = "/index.html";
        });
    } else {
        alert("Username or password wrong, pls again 👍👌");
    }
});
