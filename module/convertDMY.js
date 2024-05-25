export function convertDMY() {
    let now = new Date().toISOString();
    let postDate = new Date(now).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return postDate;
}
