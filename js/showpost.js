document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postArea = document.querySelector(".content");
    let countPost = document.querySelector(".count-post");

    // Sắp xếp bài đăng từ mới đến cũ dựa trên timestamp
    posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    let html = ``;

    posts.forEach((post, index) => {
        html += `
            <a href="./page/comment.html?id=${index}" class="c-block my-3">
                <div class="p-3">
                    <h6 class="text-secondary">Post by <label class="fw-bold">u/${post.user}</label> ${post.timestamp}</h6>
                    <h5 class="fw-bold">${post.title}</h5>
                    <p class="text-black-50">${post.body}</p>
                </div>
                <img class="content-img ${post.url ? "" : "hidden"}"  src="${post.url}" alt="" />
            </a>
            `;
    });

    countPost.innerHTML = posts.length + " post";
    postArea.innerHTML = html;
});
