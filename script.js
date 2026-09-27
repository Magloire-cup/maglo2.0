/* =========================================================
   MAGLOIRE · Portfolio Génie mécanique
   Interactions : thème, accents, menu, filtres, TOC, partage
   ========================================================= */

(function () {
    "use strict";

    const root = document.documentElement;
    const body = document.body;

    /* ---------------------------------------------------------
       1. THÈME CLAIR / SOMBRE
       --------------------------------------------------------- */

    const themeButtons = [
        ...document.querySelectorAll("[data-theme-toggle], #themeBtn"),
    ];

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute("content", theme === "dark" ? "#060a14" : "#f5f7fb");
        }
        themeButtons.forEach((button) => {
            button.setAttribute("aria-pressed", String(theme === "dark"));
            button.setAttribute(
                "title",
                theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"
            );
        });
    }

    function savedTheme() {
        try {
            return localStorage.getItem("theme");
        } catch (error) {
            return null;
        }
    }

    const initialTheme =
        savedTheme() ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");

    applyTheme(initialTheme);

    themeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const next =
                root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            applyTheme(next);
            try {
                localStorage.setItem("theme", next);
            } catch (error) {
                /* stockage indisponible : on ignore */
            }
        });
    });


    /* ---------------------------------------------------------
       2. ACCENT DE COULEUR (OPTION UTILISATEUR)
       --------------------------------------------------------- */

    const accentWrap = document.getElementById("accentWrap");
    const accentButton = document.getElementById("accentBtn");
    const accentPop = document.getElementById("accentPop");
    const swatches = [...document.querySelectorAll(".accent-swatch")];

    function applyAccent(accent) {
        root.setAttribute("data-accent", accent);
        swatches.forEach((swatch) => {
            const isActive = swatch.dataset.accent === accent;
            swatch.classList.toggle("active", isActive);
            swatch.setAttribute("aria-pressed", String(isActive));
        });
    }

    let storedAccent = "azur";
    try {
        storedAccent = localStorage.getItem("accent") || "azur";
    } catch (error) {
        /* stockage indisponible */
    }
    applyAccent(storedAccent);

    swatches.forEach((swatch) => {
        swatch.addEventListener("click", () => {
            applyAccent(swatch.dataset.accent);
            try {
                localStorage.setItem("accent", swatch.dataset.accent);
            } catch (error) {
                /* stockage indisponible */
            }
            if (accentPop) {
                accentPop.classList.remove("open");
            }
        });
    });

    if (accentButton && accentPop) {
        accentButton.addEventListener("click", (event) => {
            event.stopPropagation();
            accentPop.classList.toggle("open");
            accentButton.setAttribute(
                "aria-expanded",
                String(accentPop.classList.contains("open"))
            );
        });

        document.addEventListener("click", (event) => {
            if (accentWrap && !accentWrap.contains(event.target)) {
                accentPop.classList.remove("open");
                accentButton.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* ---------------------------------------------------------
       3. MENU MOBILE
       --------------------------------------------------------- */

    const menuButton = document.getElementById("menuBtn");
    const mobilePanel = document.getElementById("mobilePanel");
    const mobileClose = document.getElementById("mobileClose");
    const mobileOverlay = mobilePanel
        ? mobilePanel.querySelector(".mobile-overlay")
        : null;

    function openMenu() {
        if (!mobilePanel) return;
        mobilePanel.classList.add("open");
        mobilePanel.setAttribute("aria-hidden", "false");
        body.classList.add("no-scroll");
        if (menuButton) {
            menuButton.classList.add("open");
            menuButton.setAttribute("aria-expanded", "true");
        }
    }

    function closeMenu() {
        if (!mobilePanel) return;
        mobilePanel.classList.remove("open");
        mobilePanel.setAttribute("aria-hidden", "true");
        body.classList.remove("no-scroll");
        if (menuButton) {
            menuButton.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    }

    if (menuButton) {
        menuButton.addEventListener("click", () => {
            mobilePanel && mobilePanel.classList.contains("open")
                ? closeMenu()
                : openMenu();
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener("click", closeMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeMenu);
    }

    if (mobilePanel) {
        mobilePanel.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            if (accentPop) {
                accentPop.classList.remove("open");
            }
        }
    });


    /* ---------------------------------------------------------
       4. EN-TÊTE, PROGRESSION, RETOUR EN HAUT
       --------------------------------------------------------- */

    const header = document.querySelector(".site-header");
    const scrollProgress = document.querySelector(".scroll-progress");
    const readProgress = document.querySelector(".read-progress");
    const articleBody = document.querySelector(".article-body");
    const toTop = document.getElementById("toTop");

    if (readProgress && articleBody) {
        body.classList.add("has-read-progress");
    }

    function onScroll() {
        const scrollY = window.scrollY || window.pageYOffset;

        if (header) {
            header.classList.toggle("scrolled", scrollY > 8);
        }

        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(scrollY / max, 1) : 0;

        if (scrollProgress) {
            scrollProgress.style.width = ratio * 100 + "%";
        }

        if (toTop) {
            toTop.classList.toggle("show", scrollY > 700);
        }

        if (readProgress && articleBody) {
            const rect = articleBody.getBoundingClientRect();
            const total = rect.height - window.innerHeight * 0.4;
            const done = -rect.top + window.innerHeight * 0.2;
            const value = total > 0 ? Math.min(Math.max(done / total, 0), 1) : 0;
            readProgress.style.width = value * 100 + "%";
        }
    }

    let ticking = false;
    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        },
        { passive: true }
    );
    onScroll();

    if (toTop) {
        toTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    /* ---------------------------------------------------------
       5. APPARITION AU DÉFILEMENT
       --------------------------------------------------------- */

    const revealItems = [...document.querySelectorAll(".reveal")];

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("in"));
    }

    /* Barres de compétences */

    const skillFills = [...document.querySelectorAll(".skill-fill")];

    if (skillFills.length && "IntersectionObserver" in window) {
        const skillObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                        skillObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        skillFills.forEach((fill) => skillObserver.observe(fill));
    } else {
        skillFills.forEach((fill) => fill.classList.add("animate"));
    }

    /* Compteurs */

    const counters = [...document.querySelectorAll(".stat-num[data-count]")];

    function animateCounter(element) {
        const target = parseFloat(element.dataset.count);
        const suffix = element.dataset.suffix || "";
        const decimals = Number.isInteger(target) ? 0 : 1;
        const duration = 1300;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent =
                (target * eased).toFixed(decimals).replace(".", ",") + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    if (counters.length) {
        if ("IntersectionObserver" in window) {
            const counterObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            animateCounter(entry.target);
                            counterObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.6 }
            );

            counters.forEach((counter) => counterObserver.observe(counter));
        } else {
            counters.forEach((counter) => {
                counter.textContent =
                    counter.dataset.count + (counter.dataset.suffix || "");
            });
        }
    }


    /* ---------------------------------------------------------
       6. FILTRES + RECHERCHE (ARTICLES, PROJETS, RESSOURCES)
       --------------------------------------------------------- */

    const filterGrid = document.getElementById("filterGrid");
    const filterChips = [...document.querySelectorAll(".chip[data-filter]")];
    const searchInput = document.getElementById("search");
    const resultsCount = document.getElementById("resultsCount");
    const noResults = document.getElementById("noResults");

    if (filterGrid) {
        const items = [...filterGrid.querySelectorAll("[data-category]")];
        let activeFilter = "all";

        const foldAccents = (value) =>
            value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        function updateResults() {
            const query = searchInput
                ? foldAccents(searchInput.value.trim())
                : "";
            let visible = 0;

            items.forEach((item) => {
                const categories = (item.dataset.category || "")
                    .toLowerCase()
                    .split(/\s+/);
                const matchesFilter =
                    activeFilter === "all" ||
                    categories.includes(activeFilter.toLowerCase());
                const haystack = foldAccents(
                    (item.dataset.title || "") +
                        " " +
                        item.textContent
                );
                const matchesSearch = !query || haystack.includes(query);
                const show = matchesFilter && matchesSearch;

                item.hidden = !show;
                if (show) {
                    visible += 1;
                }
            });

            if (resultsCount) {
                resultsCount.textContent =
                    visible +
                    (visible > 1 ? " résultats affichés" : " résultat affiché");
            }

            if (noResults) {
                noResults.hidden = visible !== 0;
            }
        }

        filterChips.forEach((chip) => {
            chip.addEventListener("click", () => {
                filterChips.forEach((item) => item.classList.remove("active"));
                chip.classList.add("active");
                activeFilter = chip.dataset.filter;
                updateResults();
            });
        });

        if (searchInput) {
            searchInput.addEventListener("input", updateResults);

            document.addEventListener("keydown", (event) => {
                if (
                    event.key === "/" &&
                    document.activeElement !== searchInput &&
                    !event.ctrlKey &&
                    !event.metaKey
                ) {
                    event.preventDefault();
                    searchInput.focus();
                }
            });
        }

        updateResults();
    }


    /* ---------------------------------------------------------
       7. PAGE ARTICLE : TOC, TEMPS DE LECTURE, SCROLLSPY
       --------------------------------------------------------- */

    const tocList = document.querySelector(".toc ol");
    const bodyHeadings = [...document.querySelectorAll(".article-body h2")];

    function slugify(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    if (tocList && bodyHeadings.length) {
        bodyHeadings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = slugify(heading.textContent) || "section-" + index;
            }
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#" + heading.id;
            link.textContent = heading.textContent;
            li.appendChild(link);
            tocList.appendChild(li);
        });

        const tocLinks = [...tocList.querySelectorAll("a")];

        if ("IntersectionObserver" in window) {
            const spy = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            tocLinks.forEach((link) =>
                                link.classList.toggle(
                                    "active",
                                    link.getAttribute("href") ===
                                        "#" + entry.target.id
                                )
                            );
                        }
                    });
                },
                { rootMargin: "-25% 0px -65% 0px" }
            );

            bodyHeadings.forEach((heading) => spy.observe(heading));
        }
    }

    /* Temps de lecture calculé depuis le contenu réel */

    const readingSlots = [...document.querySelectorAll("[data-reading-time]")];

    if (readingSlots.length && articleBody) {
        const words = articleBody.textContent.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.round(words / 200));
        readingSlots.forEach((slot) => {
            slot.textContent = minutes + " min";
        });

        const readTimeMeta = document.querySelector("[data-reading-meta]");
        if (readTimeMeta) {
            readTimeMeta.textContent = minutes + " min de lecture";
        }
    }


    /* ---------------------------------------------------------
       8. TOAST + COPIE (EMAIL, LIEN)
       --------------------------------------------------------- */

    const toast = document.getElementById("toast");
    let toastTimer = null;

    function showToast(message) {
        if (!toast) return;
        const label = toast.querySelector("[data-toast-text]");
        if (label) {
            label.textContent = message;
        }
        toast.classList.add("show");
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
            toast.classList.remove("show");
        }, 2600);
    }

    function copyText(value, message) {
        const fallback = () => {
            const helper = document.createElement("textarea");
            helper.value = value;
            helper.setAttribute("readonly", "");
            helper.style.position = "absolute";
            helper.style.left = "-9999px";
            document.body.appendChild(helper);
            helper.select();
            try {
                document.execCommand("copy");
                showToast(message);
            } catch (error) {
                showToast("Copie impossible sur ce navigateur");
            }
            document.body.removeChild(helper);
        };

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
                .writeText(value)
                .then(() => showToast(message))
                .catch(fallback);
        } else {
            fallback();
        }
    }

    document.querySelectorAll("[data-copy]").forEach((button) => {
        button.addEventListener("click", () => {
            copyText(button.dataset.copy, button.dataset.copyMessage || "Copié !");
        });
    });

    document.querySelectorAll("[data-copy-link]").forEach((button) => {
        button.addEventListener("click", () => {
            copyText(
                window.location.href,
                button.dataset.copyMessage || "Lien de l'article copié !"
            );
        });
    });


    /* ---------------------------------------------------------
       9. FAQ : UNE SEULE RÉPONSE OUVERTE À LA FOIS
       --------------------------------------------------------- */

    document.querySelectorAll(".faq").forEach((faq) => {
        const items = [...faq.querySelectorAll("details")];
        items.forEach((item) => {
            item.addEventListener("toggle", () => {
                if (item.open) {
                    items.forEach((other) => {
                        if (other !== item) {
                            other.open = false;
                        }
                    });
                }
            });
        });
    });


    /* ---------------------------------------------------------
       10. FORMULAIRES : ÉTAT D'ENVOI
       --------------------------------------------------------- */

    document.querySelectorAll("form[data-form]").forEach((form) => {
        form.addEventListener("submit", () => {
            const button = form.querySelector('button[type="submit"]');
            if (button) {
                button.disabled = true;
                button.dataset.label = button.textContent;
                button.textContent = "Envoi en cours…";
            }
        });
    });


    /* ---------------------------------------------------------
       11. ANNÉE COURANTE
       --------------------------------------------------------- */

    document.querySelectorAll(".current-year").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

})();
