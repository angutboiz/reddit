import { convertDMY } from "../module/convertDMY.js";

document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "./login.html";
    }

    let bgCover = document.querySelector(".image-bg");
    let url = document.querySelector("#url");
    url.addEventListener("input", function (e) {
        let newImageUrl = e.target.value;
        if (newImageUrl == "") {
            bgCover.classList.add("hidden");
        } else {
            bgCover.classList.remove("hidden");
            bgCover.src = newImageUrl;
        }
    });
});

document.addEventListener("submit", function (e) {
    e.preventDefault();

    let loggedInUser = localStorage.getItem("loggedInUser");

    let title = document.querySelector("#title").value.trim();
    let body = document.querySelector("#body").value.trim();
    let url = document.querySelector("#url").value.trim();

    if (!title) {
        alert("Title cannot be empty.");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Tạo bài đăng mới
    let newPost = {
        user: loggedInUser,
        title: title,
        body: body,
        url: url,
        timestamp: convertDMY(),
    };

    // Thêm bài đăng mới vào mảng
    posts.push(newPost);

    // Lưu lại mảng bài đăng vào localStorage
    localStorage.setItem("posts", JSON.stringify(posts));
    let timerInterval;
    Swal.fire({
        title: "Thêm bài viết thành công!",
        icon: "success",
        html: "Tự động chuyển về trang chủ sau <b></b> milliseconds.",
        timer: 1000,
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
});
