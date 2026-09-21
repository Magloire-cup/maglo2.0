// ========================================
// TCHΟGLI AYÉFOUNI MAGLOIRE
// JavaScript principal
// ========================================


// ========================================
// MODE SOMBRE
// ========================================

const themeBtn = document.getElementById("themeBtn");


// Vérifier si le bouton existe
if (themeBtn) {

    // Charger le thème enregistré
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }


    // Changer de thème
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

}



// ========================================
// FILTRAGE DES ARTICLES
// ========================================

const categories = document.querySelectorAll(".category");
const articles = document.querySelectorAll(".article");


// Vérifier si la page contient des catégories
if (categories.length > 0 && articles.length > 0) {

    categories.forEach(category => {

        category.addEventListener("click", () => {

            // Retirer active de tous les boutons
            categories.forEach(button => {
                button.classList.remove("active");
            });

            // Ajouter active au bouton sélectionné
            category.classList.add("active");

            const selectedCategory =
                category.dataset.category;


            // Filtrer les articles
            articles.forEach(article => {

                const articleCategory =
                    article.dataset.category;

                if (
                    selectedCategory === "all" ||
                    articleCategory === selectedCategory
                ) {

                    article.style.display = "";

                } else {

                    article.style.display = "none";

                }

            });


            checkResults();

        });

    });

}



// ========================================
// RECHERCHE DES ARTICLES
// ========================================

const search = document.getElementById("search");
const noResult = document.getElementById("noResult");


if (search && articles.length > 0) {

    search.addEventListener("input", () => {

        const query =
            search.value.toLowerCase().trim();


        articles.forEach(article => {

            const title =
                article.dataset.title
                ? article.dataset.title.toLowerCase()
                : "";

            const text =
                article.textContent.toLowerCase();


            if (
                title.includes(query) ||
                text.includes(query)
            ) {

                article.style.display = "";

            } else {

                article.style.display = "none";

            }

        });


        checkResults();

    });

}



// ========================================
// VÉRIFICATION DES RÉSULTATS
// ========================================

function checkResults() {

    // Si la page ne possède pas de message
    // "Aucun article trouvé", on arrête.
    if (!noResult) {
        return;
    }


    const visibleArticles =
        [...articles].filter(article => {

            return article.style.display !== "none";

        });


    if (visibleArticles.length === 0) {

        noResult.style.display = "block";

    } else {

        noResult.style.display = "none";

    }

}



// ========================================
// NEWSLETTER
// ========================================

const newsletterForm =
    document.getElementById("newsletterForm");

const message =
    document.getElementById("message");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const emailInput =
            document.getElementById("email");


        if (!emailInput) {
            return;
        }


        const email =
            emailInput.value.trim();


        if (email) {

            if (message) {

                message.textContent =
                    "Merci ! Vous êtes maintenant inscrit à la newsletter.";

                message.classList.add("success");

            }


            newsletterForm.reset();

        }

    });

}



// ========================================
// ANIMATION AU SCROLL
// ========================================

const animatedElements =
    document.querySelectorAll(
        ".article, .project-card, .domain-card"
    );


if (animatedElements.length > 0) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    animatedElements.forEach(element => {

        element.classList.add("hidden");

        observer.observe(element);

    });

}



// ========================================
// ANNÉE AUTOMATIQUE DU FOOTER
// ========================================

const yearElements =
    document.querySelectorAll(".current-year");


yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});