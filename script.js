const themeButton = document.getElementById("themeBtn");

if (themeButton) {
    const savedTheme = localStorage.getItem("theme");

    const updateThemeButton = () => {
        const isDark = document.body.classList.contains("dark");
        themeButton.textContent = isDark ? "☀️" : "🌙";
        themeButton.setAttribute(
            "aria-label",
            isDark ? "Activer le thème clair" : "Activer le thème sombre"
        );
        themeButton.setAttribute("title", themeButton.getAttribute("aria-label"));
    };

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    updateThemeButton();

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
        updateThemeButton();
    });
}

const categories = [...document.querySelectorAll(".category")];
const articles = [...document.querySelectorAll(".article")];
const searchInput = document.getElementById("search");
const noResult = document.getElementById("noResult");
let selectedCategory = "all";

function filterArticles() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    let visibleCount = 0;

    articles.forEach(article => {
        const matchesCategory =
            selectedCategory === "all" ||
            article.dataset.category === selectedCategory;
        const searchableText = `${article.dataset.title || ""} ${article.textContent}`
            .toLowerCase();
        const matchesSearch = searchableText.includes(query);
        const isVisible = matchesCategory && matchesSearch;

        article.hidden = !isVisible;

        if (isVisible) {
            visibleCount += 1;
        }
    });

    if (noResult) {
        noResult.hidden = visibleCount !== 0;
    }
}

categories.forEach(category => {
    category.addEventListener("click", () => {
        categories.forEach(button => button.classList.remove("active"));
        category.classList.add("active");
        selectedCategory = category.dataset.category;
        filterArticles();
    });
});

if (searchInput) {
    searchInput.addEventListener("input", filterArticles);
}

document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement !== searchInput && searchInput) {
        event.preventDefault();
        searchInput.focus();
    }
});

const animatedElements = document.querySelectorAll(
    ".article, .project-card, .domain-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.classList.add("hidden");
        observer.observe(element);
    });
} else {
    animatedElements.forEach(element => element.classList.add("show"));
}

document.querySelectorAll(".current-year").forEach(element => {
    element.textContent = new Date().getFullYear();
});
