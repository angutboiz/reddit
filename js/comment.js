import { convertDMY } from "../module/convertDMY.js";

document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(window.location.search);
    let postId = params.get("id");
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = posts[postId];

    if (post) {
        document.getElementById("post-user").textContent = "u/" + post.user;
        document.getElementById("post-date").textContent = post.timestamp;
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-content").textContent = post.body;
        let postImg = document.getElementById("post-img");
        if (post.url) {
            postImg.src = post.url;
        } else {
            postImg.classList.add("hidden");
        }
        let commentInput = document.querySelector("#commentinput");
        document.addEventListener("submit", function (e) {
            e.preventDefault();
            let commentValue = commentInput.value;
            console.log(commentValue);
            if (commentValue != "") {
                post.comments = post.comments || []; // Tạo mảng bình luận nếu chưa có
                let loggedInUser = localStorage.getItem("loggedInUser");

                let newCommand = {
                    user: loggedInUser,
                    title: commentValue,
                    timestamp: convertDMY(),
                };
                post.comments.push(newCommand);

                localStorage.setItem("posts", JSON.stringify(posts));

                // Xóa nội dung của input sau khi thêm bình luận thành công
                window.location.reload();
            } else {
                alert("Please enter a comment.");
            }
        });
    } else {
        alert("Post not found.");
        window.location.href = "/"; // Quay lại trang chính nếu không tìm thấy bài đăng
    }
    let commentsList = document.querySelector(".comment");

    var html = ``;
    if (posts[postId].comments) {
        posts[postId].comments.map((item, index) => {
            html += ` <div class="c-block" style="background-image: linear-gradient( 68.4deg,  rgba(248,182,204,1) 0.5%, rgba(192,198,230,1) 49%, rgba(225,246,240,1) 99.8% );">
                        <div class="p-3">
                            <h6 class="text-secondary">Post by <label class="fw-bold">u/${item.user}</label> ${item.timestamp}</h6>
                            <p class="text-black">${item.title}</p>
                        </div>
                    </div>`;
        });

        commentsList.innerHTML = html;
    }
});
