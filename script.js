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


    /* ---------------------------------------------------------
       12. LANGUE DU SITE (TRADUCTION AUTOMATIQUE)
       --------------------------------------------------------- */

    const LANGUAGES = [
        { code: "fr", name: "Français", fr: "français" },
        { code: "en", name: "English", fr: "anglais" },
        { code: "es", name: "Español", fr: "espagnol" },
        { code: "pt", name: "Português", fr: "portugais" },
        { code: "de", name: "Deutsch", fr: "allemand" },
        { code: "it", name: "Italiano", fr: "italien" },
        { code: "nl", name: "Nederlands", fr: "néerlandais" },
        { code: "ar", name: "العربية", fr: "arabe" },
        { code: "zh-CN", name: "中文（简体）", fr: "chinois simplifié" },
        { code: "zh-TW", name: "中文（繁體）", fr: "chinois traditionnel" },
        { code: "ja", name: "日本語", fr: "japonais" },
        { code: "ko", name: "한국어", fr: "coréen" },
        { code: "ru", name: "Русский", fr: "russe" },
        { code: "uk", name: "Українська", fr: "ukrainien" },
        { code: "pl", name: "Polski", fr: "polonais" },
        { code: "ro", name: "Română", fr: "roumain" },
        { code: "tr", name: "Türkçe", fr: "turc" },
        { code: "sv", name: "Svenska", fr: "suédois" },
        { code: "no", name: "Norsk", fr: "norvégien" },
        { code: "da", name: "Dansk", fr: "danois" },
        { code: "fi", name: "Suomi", fr: "finnois" },
        { code: "cs", name: "Čeština", fr: "tchèque" },
        { code: "sk", name: "Slovenčina", fr: "slovaque" },
        { code: "hu", name: "Magyar", fr: "hongrois" },
        { code: "el", name: "Ελληνικά", fr: "grec" },
        { code: "he", name: "עברית", fr: "hébreu" },
        { code: "hi", name: "हिन्दी", fr: "hindi" },
        { code: "bn", name: "বাংলা", fr: "bengali" },
        { code: "ur", name: "اردو", fr: "ourdou" },
        { code: "fa", name: "فارسی", fr: "persan" },
        { code: "vi", name: "Tiếng Việt", fr: "vietnamien" },
        { code: "th", name: "ไทย", fr: "thaï" },
        { code: "id", name: "Bahasa Indonesia", fr: "indonésien" },
        { code: "ms", name: "Bahasa Melayu", fr: "malais" },
        { code: "fil", name: "Filipino", fr: "filipino" },
        { code: "sw", name: "Kiswahili", fr: "swahili" },
        { code: "am", name: "አማርኛ", fr: "amharique" },
        { code: "ha", name: "Hausa", fr: "haoussa" },
        { code: "yo", name: "Yorùbá", fr: "yoruba" },
        { code: "ig", name: "Igbo", fr: "igbo" },
        { code: "zu", name: "isiZulu", fr: "zoulou" },
        { code: "af", name: "Afrikaans", fr: "afrikaans" },
        { code: "so", name: "Soomaali", fr: "somali" },
        { code: "wo", name: "Wolof", fr: "wolof" },
        { code: "ee", name: "Ewe", fr: "éwé" },
        { code: "tw", name: "Twi", fr: "twi" },
        { code: "bm", name: "Bamanankan", fr: "bambara" },
        { code: "ln", name: "Lingála", fr: "lingala" },
        { code: "lg", name: "Luganda", fr: "luganda" },
        { code: "rw", name: "Kinyarwanda", fr: "kinyarwanda" },
        { code: "mg", name: "Malagasy", fr: "malgache" },
        { code: "ka", name: "ქართული", fr: "géorgien" },
        { code: "hy", name: "Հայերեն", fr: "arménien" },
        { code: "az", name: "Azərbaycan", fr: "azéri" },
        { code: "kk", name: "Қазақша", fr: "kazakh" },
        { code: "uz", name: "Oʻzbekcha", fr: "ouzbek" },
        { code: "mn", name: "Монгол", fr: "mongol" },
        { code: "ne", name: "नेपाली", fr: "népalais" },
        { code: "si", name: "සිංහල", fr: "cingalais" },
        { code: "ta", name: "தமிழ்", fr: "tamoul" },
        { code: "te", name: "తెలుగు", fr: "télougou" },
        { code: "ml", name: "മലയാളം", fr: "malayalam" },
        { code: "kn", name: "ಕನ್ನಡ", fr: "kannada" },
        { code: "gu", name: "ગુજરાતી", fr: "gujarati" },
        { code: "mr", name: "मराठी", fr: "marathi" },
        { code: "pa", name: "ਪੰਜਾਬੀ", fr: "pendjabi" },
        { code: "my", name: "မြန်မာ", fr: "birman" },
        { code: "km", name: "ខ្មែរ", fr: "khmer" },
        { code: "lo", name: "ລາວ", fr: "lao" },
        { code: "be", name: "Беларуская", fr: "biélorusse" },
        { code: "bg", name: "Български", fr: "bulgare" },
        { code: "sr", name: "Српски", fr: "serbe" },
        { code: "hr", name: "Hrvatski", fr: "croate" },
        { code: "sl", name: "Slovenščina", fr: "slovène" },
        { code: "lt", name: "Lietuvių", fr: "lituanien" },
        { code: "lv", name: "Latviešu", fr: "letton" },
        { code: "et", name: "Eesti", fr: "estonien" },
        { code: "is", name: "Íslenska", fr: "islandais" },
        { code: "ga", name: "Gaeilge", fr: "irlandais" },
        { code: "cy", name: "Cymraeg", fr: "gallois" },
        { code: "gl", name: "Galego", fr: "galicien" },
        { code: "ca", name: "Català", fr: "catalan" },
        { code: "eu", name: "Euskara", fr: "basque" },
        { code: "sq", name: "Shqip", fr: "albanais" },
        { code: "mk", name: "Македонски", fr: "macédonien" },
        { code: "bs", name: "Bosanski", fr: "bosnien" },
        { code: "mt", name: "Malti", fr: "maltais" },
        { code: "ht", name: "Kreyòl ayisyen", fr: "créole haïtien" },
        { code: "eo", name: "Esperanto", fr: "espéranto" },
        { code: "la", name: "Latina", fr: "latin" },
        { code: "mi", name: "Te Reo Māori", fr: "maori" },
        { code: "haw", name: "ʻŌlelo Hawaiʻi", fr: "hawaïen" },
        { code: "sm", name: "Gagana Sāmoa", fr: "samoan" },
        { code: "to", name: "Lea faka-Tonga", fr: "tongien" },
        { code: "fj", name: "Vosa Vakaviti", fr: "fidjien" },
        { code: "st", name: "Sesotho", fr: "sesotho" },
        { code: "sn", name: "chiShona", fr: "shona" },
        { code: "xh", name: "isiXhosa", fr: "xhosa" },
        { code: "ny", name: "Chichewa", fr: "chichewa" },
        { code: "su", name: "Basa Sunda", fr: "soundanais" },
        { code: "jv", name: "Basa Jawa", fr: "javanais" },
        { code: "ceb", name: "Cebuano", fr: "cébouano" },
        { code: "co", name: "Corsu", fr: "corse" },
        { code: "fy", name: "Frysk", fr: "frison" },
        { code: "lb", name: "Lëtzebuergesch", fr: "luxembourgeois" },
        { code: "ky", name: "Кыргызча", fr: "kirghize" },
        { code: "tg", name: "Тоҷикӣ", fr: "tadjik" },
        { code: "tk", name: "Türkmençe", fr: "turkmène" },
        { code: "ps", name: "پښتو", fr: "pachto" },
        { code: "sd", name: "سنڌي", fr: "sindhi" },
        { code: "ku", name: "Kurdî", fr: "kurde" },
        { code: "or", name: "ଓଡ଼ିଆ", fr: "oriya" },
        { code: "hmn", name: "Hmoob", fr: "hmong" },
        { code: "yi", name: "ייִדיש", fr: "yiddish" },
    ];

    const langWrap = document.getElementById("langWrap");
    const langButton = document.getElementById("langBtn");
    const langPop = document.getElementById("langPop");
    const langList = document.getElementById("langList");
    const langSearch = document.getElementById("langSearch");
    const langCode = document.getElementById("langCode");
    const langSelects = [...document.querySelectorAll("[data-lang-select]")];

    function readLanguageCookie() {
        const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
        if (!match) {
            return "";
        }
        const parts = decodeURIComponent(match[1]).split("/");
        return parts[2] || "";
    }

    function currentLanguage() {
        const cookieValue = readLanguageCookie();
        if (cookieValue) {
            return cookieValue;
        }
        try {
            return localStorage.getItem("site-lang") || "fr";
        } catch (error) {
            return "fr";
        }
    }

    function languageBadge(code) {
        return code === "fr" ? "FR" : code.split("-")[0].toUpperCase();
    }

    function writeLanguageCookie(value) {
        const expired = "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        const hosts = [""];
        if (location.hostname && location.hostname.indexOf(".") !== -1) {
            hosts.push(location.hostname, "." + location.hostname);
        }
        hosts.forEach((host) => {
            const domain = host ? "; domain=" + host : "";
            document.cookie =
                "googtrans=" + value + "; path=/" + domain + (value ? "" : expired);
        });
    }

    function applyLanguage(code) {
        const target = code || "fr";
        if (target === activeLanguage) {
            return;
        }
        try {
            localStorage.setItem("site-lang", target);
        } catch (error) {
            /* stockage indisponible : on continue avec le cookie */
        }
        writeLanguageCookie(target === "fr" ? "" : "/fr/" + target);
        location.reload();
    }

    let activeLanguage = currentLanguage();
    if (!LANGUAGES.some((lang) => lang.code === activeLanguage)) {
        activeLanguage = "fr";
    }
    if (langCode) {
        langCode.textContent = languageBadge(activeLanguage);
    }

    function renderLanguageList(filter) {
        if (!langList) {
            return;
        }
        const query = (filter || "").trim().toLowerCase();
        const visible = LANGUAGES.filter((lang) => {
            if (!query) {
                return true;
            }
            return (
                lang.name.toLowerCase().indexOf(query) !== -1 ||
                lang.fr.toLowerCase().indexOf(query) !== -1 ||
                lang.code.toLowerCase().indexOf(query) !== -1
            );
        });

        langList.innerHTML = "";

        if (!visible.length) {
            const empty = document.createElement("p");
            empty.className = "lang-empty";
            empty.textContent = "Aucune langue trouvée.";
            langList.appendChild(empty);
            return;
        }

        visible.forEach((lang) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className =
                "lang-item" + (lang.code === activeLanguage ? " active" : "");
            item.dataset.lang = lang.code;

            const native = document.createElement("span");
            native.textContent = lang.name;

            const iso = document.createElement("span");
            iso.className = "lang-iso";
            iso.textContent = lang.code === "fr" ? "Référence" : lang.code;

            item.appendChild(native);
            item.appendChild(iso);
            item.addEventListener("click", () => applyLanguage(lang.code));
            langList.appendChild(item);
        });
    }

    renderLanguageList("");

    langSelects.forEach((select) => {
        LANGUAGES.forEach((lang) => {
            const option = document.createElement("option");
            option.value = lang.code;
            option.textContent = lang.name;
            select.appendChild(option);
        });
        select.value = activeLanguage;
        select.addEventListener("change", () => applyLanguage(select.value));
    });

    if (langButton && langPop) {
        function closeLanguages() {
            langPop.classList.remove("open");
            langButton.setAttribute("aria-expanded", "false");
        }

        langButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = langPop.classList.contains("open");
            if (isOpen) {
                closeLanguages();
                return;
            }
            langPop.classList.add("open");
            langButton.setAttribute("aria-expanded", "true");
            if (langSearch) {
                langSearch.value = "";
                renderLanguageList("");
                langSearch.focus();
            }
        });

        langPop.addEventListener("click", (event) => event.stopPropagation());

        document.addEventListener("click", (event) => {
            if (langWrap && !langWrap.contains(event.target)) {
                closeLanguages();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeLanguages();
            }
        });

        if (langSearch) {
            langSearch.addEventListener("input", () => {
                renderLanguageList(langSearch.value);
            });
        }
    }

    /* Google Traduction n'est chargé que si une autre langue est sélectionnée. */

    if (activeLanguage !== "fr") {
        const translateHost = document.createElement("div");
        translateHost.id = "google_translate_element";
        translateHost.className = "gt-host";
        document.body.appendChild(translateHost);

        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "fr",
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };

        const translateScript = document.createElement("script");
        translateScript.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        translateScript.async = true;
        document.body.appendChild(translateScript);
    }

})();
