// ==============================
// MODE SOMBRE
// ==============================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}


// ==============================
// FILTRAGE PAR CATÉGORIE
// ==============================

const categories = document.querySelectorAll(".category");
const articles = document.querySelectorAll(".article");

categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(btn => {
            btn.classList.remove("active");
        });

        category.classList.add("active");

        const selectedCategory = category.dataset.category;

        articles.forEach(article => {

            if (
                selectedCategory === "all" ||
                article.dataset.category === selectedCategory
            ) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }

        });

        checkResults();
    });
});


// ==============================
// RECHERCHE
// ==============================

const search = document.getElementById("search");
const noResult = document.getElementById("noResult");

search.addEventListener("input", () => {

    const query = search.value.toLowerCase().trim();

    articles.forEach(article => {

        const title = article.dataset.title.toLowerCase();
        const text = article.textContent.toLowerCase();

        if (title.includes(query) || text.includes(query)) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }

    });

    checkResults();
});


// ==============================
// VÉRIFICATION DES RÉSULTATS
// ==============================

function checkResults() {

    const visibleArticles = [...articles].filter(article => {
        return article.style.display !== "none";
    });

    if (visibleArticles.length === 0) {
        noResult.style.display = "block";
    } else {
        noResult.style.display = "none";
    }
}


// ==============================
// NEWSLETTER
// ==============================

const newsletterForm = document.getElementById("newsletterForm");
const message = document.getElementById("message");

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;

    if (email) {
        message.textContent =
            "Merci ! Vous êtes maintenant inscrit à la newsletter.";

        newsletterForm.reset();
    }
});