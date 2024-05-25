document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");
    let tableBody = document.querySelector(".table-status tbody");

    if (!loggedInUser) {
        window.location.href = "./login.html";
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    function renderPosts() {
        tableBody.innerHTML = "";
        posts.forEach((item, index) => {
            if (item.user === loggedInUser) {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td><img width="200" height="100" class=${item.url ? item.url : "hidden"} src="${item.url}" alt="" /></td>
                    <td>${item.title}</td>
                    <td>${item.body}</td>
                    <td>
                        <button class="btn btn-primary mb-2 edit-btn" data-index="${index}">Sửa</button>
                        <button class="btn btn-outline-danger delete-btn" data-index="${index}">Xoá</button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        });
        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                Swal.fire({
                    title: "Bạn có chắc muốn xoá không?",
                    text: "Bạn sẽ không thể khôi phục lại khi xoá!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        posts.splice(index, 1); // Xóa bài đăng khỏi mảng
                        localStorage.setItem("posts", JSON.stringify(posts)); // Cập nhật localStorage
                        renderPosts(); // Cập nhật giao diện
                        Swal.fire({
                            title: "Xoá thành công!",
                            text: "Nội dung của bạn đã được xoá.",
                            icon: "success",
                        });
                    }
                });
            });
        });

        document.querySelectorAll(".edit-btn").forEach((button) => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                let item = posts[index];
                let row = this.parentElement.parentElement;
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td><input type="text" class="form-control" value="${item.url}" /></td>
                    <td><input type="text" class="form-control" value="${item.title}" /></td>
                    <td><textarea rows="6" cols="50" class="form-control">${item.body}</textarea></td>
                    <td class="d-flex flex-column align-items-center">
                        <button class="btn btn-success mb-2 save-btn" data-index="${index}">Lưu</button>
                        <button class="btn btn-secondary cancel-btn">Hủy</button>
                    </td>
                `;
                addSaveCancelListeners();
            });
        });
    }

    function addSaveCancelListeners() {
        document.querySelectorAll(".save-btn").forEach((button) => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                let row = this.parentElement.parentElement;
                let inputs = row.querySelectorAll("input, textarea");
                let url = inputs[0].value;
                let title = inputs[1].value;
                let body = inputs[2].value;

                posts[index].url = url;
                posts[index].title = title;
                posts[index].body = body;

                localStorage.setItem("posts", JSON.stringify(posts)); // Cập nhật localStorage
                renderPosts(); // Cập nhật giao diện
            });
        });

        document.querySelectorAll(".cancel-btn").forEach((button) => {
            button.addEventListener("click", function () {
                renderPosts(); // Cập nhật giao diện
            });
        });
    }

    renderPosts();
});
