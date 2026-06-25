const searchInput = document.querySelector(".articles-search__input");
const filterButtons = document.querySelectorAll(".articles-filter");
const posts = document.querySelectorAll(".post-card");
const emptyMessage = document.querySelector(".articles-empty");

let currentFilter = "all";

function updatePosts() {
    const searchValue = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    posts.forEach((post) => {
        const category = post.dataset.category;
        const title = post.dataset.title.toLowerCase();
        const text = post.textContent.toLowerCase();

        const matchesFilter = currentFilter === "all" || category === currentFilter;
        const matchesSearch = text.includes(searchValue) || title.includes(searchValue);

        if (matchesFilter && matchesSearch) {
            post.classList.remove("is-hidden");
            visibleCount += 1;
        } else {
            post.classList.add("is-hidden");
        }
    });

    if (visibleCount === 0) {
        emptyMessage.classList.add("is-visible");
    } else {
        emptyMessage.classList.remove("is-visible");
    }
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((item) => {
            item.classList.remove("articles-filter--active");
        });

        button.classList.add("articles-filter--active");
        currentFilter = button.dataset.filter;

        updatePosts();
    });
});

searchInput.addEventListener("input", updatePosts);