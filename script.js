document.addEventListener("DOMContentLoaded", function () {
    const postList = document.getElementById("post-list");
    const loadMoreBtn = document.getElementById("load-more");
    let page = 1;

    // Hàm thực hiện yêu cầu AJAX để lấy bài viết từ API
    const fetchPosts = async () => {
        const url = `https://seoulspa.vn/wp-json/wp/v2/posts?per_page=5&page=${page}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Hàm thêm bài viết vào danh sách trên trang
    const displayPosts = (posts) => {
        posts.forEach(post => {
            const li = document.createElement("li");
            li.textContent = post.title.rendered;
            postList.appendChild(li);
        });
    };

    // Sự kiện khi nhấn nút "Load More"
    loadMoreBtn.addEventListener("click", async () => {
        page++; // Tăng giá trị của trang trước khi gửi yêu cầu mới
        const newPosts = await fetchPosts();
        displayPosts(newPosts);
    });


    // Hiển thị bài viết ban đầu khi trang được tải lần đầu

    fetchPosts().then(initialPosts => {
        displayPosts(initialPosts);
    });
   
});
