/* =========================================================
   KALINDI VYAS — PORTFOLIO JAVASCRIPT
   Mobile Menu • Animations • Page Transitions • Form UX
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* -----------------------------------------------------
       1. MOBILE NAVIGATION
       ----------------------------------------------------- */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

            menuToggle.innerHTML = isOpen ? "✕" : "☰";
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = "☰";
            });
        });

        // Close menu if user taps outside it
        document.addEventListener("click", (event) => {
            const clickedInsideNav =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideNav) {
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = "☰";
            }
        });
    }


    /* -----------------------------------------------------
       2. ACTIVE PAGE IN NAVIGATION
       ----------------------------------------------------- */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach((link) => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active-page");
            link.setAttribute("aria-current", "page");
        }
    });


    /* -----------------------------------------------------
       3. ADD JS-ENABLED CLASS
       Used for progressive enhancement.
       Content remains visible if JavaScript fails.
       ----------------------------------------------------- */

    document.documentElement.classList.add("js-enabled");


    /* -----------------------------------------------------
       4. SCROLL REVEAL ANIMATIONS
       ----------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".intro-card, " +
        ".journey-preview-card, " +
        ".career-mini-card, " +
        ".about-main-text, " +
        ".about-highlight-card, " +
        ".personality-card, " +
        ".education-card, " +
        ".timeline-item, " +
        ".achievement-card, " +
        ".skill-card, " +
        ".interest-card, " +
        ".career-step, " +
        ".career-philosophy, " +
        ".contact-info, " +
        ".contact-form"
    );

    if ("IntersectionObserver" in window && revealElements.length) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element, index) => {
            element.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 45, 300)}ms`
            );

            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    /* -----------------------------------------------------
       5. PAGE LOAD TRANSITION
       ----------------------------------------------------- */

    document.body.classList.add("page-loaded");


    /* -----------------------------------------------------
       6. PAGE-TO-PAGE TRANSITION
       Only applies to internal HTML links.
       ----------------------------------------------------- */

    document.querySelectorAll("a").forEach((link) => {
        const href = link.getAttribute("href");

        if (!href) return;

        const isInternalPage =
            href.endsWith(".html") &&
            !href.startsWith("http") &&
            !href.startsWith("#");

        if (!isInternalPage) return;

        link.addEventListener("click", (event) => {
            // Don't interfere with modifier-clicks
            if (
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            event.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.href = href;
            }, 180);
        });
    });


    /* -----------------------------------------------------
       7. SMOOTH SCROLL FOR # LINKS
       ----------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* -----------------------------------------------------
       8. CONTACT FORM
       Front-end only.
       This gives the user feedback without a backend.
       ----------------------------------------------------- */

    const contactForm = document.querySelector(".contact-form");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = contactForm.querySelector(
                'input[name="name"]'
            );

            const emailInput = contactForm.querySelector(
                'input[name="email"]'
            );

            const messageInput = contactForm.querySelector(
                'textarea[name="message"]'
            );

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            // Basic validation
            if (!name || !email || !message) {
                showFormMessage(
                    "Please fill in all the fields before sending.",
                    "error"
                );
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );
                return;
            }

            showFormMessage(
                `Thank you, ${name}! Your message has been prepared successfully.`,
                "success"
            );

            contactForm.reset();
        });
    }


    /* -----------------------------------------------------
       9. FORM MESSAGE HELPER
       ----------------------------------------------------- */

    function showFormMessage(message, type) {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = "form-message";
        formMessage.classList.add(type);

        formMessage.style.display = "block";

        setTimeout(() => {
            formMessage.style.opacity = "1";
        }, 20);
    }


    /* -----------------------------------------------------
       10. EMAIL VALIDATION
       ----------------------------------------------------- */

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    /* -----------------------------------------------------
       11. NAVBAR SHADOW ON SCROLL
       ----------------------------------------------------- */

    const siteHeader = document.querySelector(".site-header");

    if (siteHeader) {
        const updateHeader = () => {
            if (window.scrollY > 20) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();
    }


    /* -----------------------------------------------------
       12. SUBTLE PARALLAX FOR HERO VISUAL
       Disabled on touch devices for better performance.
       ----------------------------------------------------- */

    const heroVisual = document.querySelector(".hero-visual");

    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

    if (heroVisual && !isTouchDevice) {
        const orb = heroVisual.querySelector(".orb");

        window.addEventListener(
            "mousemove",
            (event) => {
                const x = (event.clientX / window.innerWidth - 0.5) * 2;
                const y = (event.clientY / window.innerHeight - 0.5) * 2;

                if (orb) {
                    orb.style.transform =
                        `translate3d(${x * 8}px, ${y * 8}px, 0)`;
                }
            },
            { passive: true }
        );
    }


    /* -----------------------------------------------------
       13. CARD TILT
       Very subtle effect on larger screens only.
       ----------------------------------------------------- */

    const tiltCards = document.querySelectorAll(
        ".achievement-card, " +
        ".skill-card, " +
        ".interest-card, " +
        ".personality-card, " +
        ".intro-card"
    );

    if (!isTouchDevice && window.innerWidth >= 900) {
        tiltCards.forEach((card) => {
            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width;

                const y =
                    (event.clientY - rect.top) / rect.height;

                const rotateX = (0.5 - y) * 4;
                const rotateY = (x - 0.5) * 4;

                card.style.transform =
                    `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }


    /* -----------------------------------------------------
       14. CURRENT YEAR
       Automatically keeps footer year updated.
       ----------------------------------------------------- */

    const yearElements = document.querySelectorAll("[data-year]");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /* -----------------------------------------------------
       15. ESCAPE KEY — CLOSE MOBILE MENU
       ----------------------------------------------------- */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navLinks) {
            navLinks.classList.remove("active");

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.innerHTML = "☰";
            }
        }
    });


    /* -----------------------------------------------------
       16. REDUCED MOTION SUPPORT
       ----------------------------------------------------- */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
        document.documentElement.classList.add("reduced-motion");
    }
});
