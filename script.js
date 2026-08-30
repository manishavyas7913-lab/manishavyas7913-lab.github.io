/* =========================================================
   KALINDI VYAS — PREMIUM INTERACTIVE PORTFOLIO
   script.js
   ========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           1. MOBILE NAVIGATION
        ===================================================== */

        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );

        const navMenu =
            document.querySelector(
                ".nav-links"
            );


        if (
            menuToggle &&
            navMenu
        ) {

            menuToggle.addEventListener(
                "click",
                () => {

                    const isOpen =
                        navMenu.classList.toggle(
                            "open"
                        );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );


                    menuToggle.textContent =
                        isOpen ? "✕" : "☰";

                }
            );


            navMenu
                .querySelectorAll("a")
                .forEach(link => {

                    link.addEventListener(
                        "click",
                        () => {

                            navMenu.classList.remove(
                                "open"
                            );


                            menuToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );


                            menuToggle.textContent =
                                "☰";

                        }
                    );

                });

        }


        /* =====================================================
           2. ACTIVE NAVIGATION
        ===================================================== */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop() || "index.html";


        document
            .querySelectorAll(
                ".nav-links a"
            )
            .forEach(link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href === currentPage ||
                    (
                        currentPage === "" &&
                        href === "index.html"
                    )
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });


        /* =====================================================
           3. SCROLL REVEAL
        ===================================================== */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            "visible"
                                        );


                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12,
                        rootMargin:
                            "0px 0px -30px 0px"
                    }
                );


            revealElements.forEach(
                element => {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                element => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* =====================================================
           4. FOOTER YEAR
        ===================================================== */

        const yearElement =
            document.querySelector(
                "[data-year]"
            );


        if (yearElement) {

            yearElement.textContent =
                new Date()
                    .getFullYear();

        }


        /* =====================================================
           5. 3D CARD TILT
        ===================================================== */

        const tiltCards =
            document.querySelectorAll(
                "[data-tilt]"
            );


        tiltCards.forEach(
            card => {


                card.addEventListener(
                    "pointermove",
                    event => {

                        /*
                         * Don't use aggressive 3D
                         * effects on small screens.
                         */

                        if (
                            window.innerWidth < 701
                        ) {

                            return;

                        }


                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) / rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) / rect.height;


                        const rotateY =
                            (x - 0.5) * 9;


                        const rotateX =
                            (0.5 - y) * 9;


                        const shadowX =
                            (x - 0.5) * 20;


                        const shadowY =
                            (y - 0.5) * 20;


                        card.style.transform =
                            `
                            perspective(1000px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            translateZ(8px)
                            translateY(-5px)
                            `;


                        card.style.boxShadow =
                            `
                            ${shadowX}px
                            ${shadowY + 25}px
                            55px
                            rgba(80,60,100,0.14)
                            `;

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () => {

                        card.style.transform =
                            "";

                        card.style.boxShadow =
                            "";

                    }
                );

            }
        );


        /* =====================================================
           6. HERO PARALLAX
        ===================================================== */

        const visual =
            document.querySelector(
                ".visual"
            );


        const blob =
            document.querySelector(
                ".blob"
            );


        const orbOne =
            document.querySelector(
                ".orb"
            );


        const orbTwo =
            document.querySelector(
                ".orb.two"
            );


        const profileCard =
            document.querySelector(
                ".profile-card"
            );


        /*
         * Only enable mouse parallax
         * on devices with fine pointers.
         */

        const finePointer =
            window.matchMedia(
                "(pointer: fine)"
            ).matches;


        if (
            visual &&
            finePointer
        ) {

            window.addEventListener(
                "mousemove",
                event => {

                    const x =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - 0.5;


                    const y =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - 0.5;


                    if (blob) {

                        blob.style.transform =
                            `
                            translate3d(
                                ${x * 12}px,
                                ${y * 12}px,
                                55px
                            )
                            rotate(
                                ${x * 3}deg
                            )
                            `;

                    }


                    if (orbOne) {

                        orbOne.style.marginLeft =
                            `${x * 22}px`;

                        orbOne.style.marginTop =
                            `${y * 22}px`;

                    }


                    if (orbTwo) {

                        orbTwo.style.marginLeft =
                            `${x * -18}px`;

                        orbTwo.style.marginTop =
                            `${y * -18}px`;

                    }


                    if (profileCard) {

                        profileCard.style.transform =
                            `
                            translate3d(
                                ${x * -18}px,
                                ${y * -18}px,
                                120px
                            )
                            rotateY(
                                ${x * -10}deg
                            )
                            rotateX(
                                ${y * 6}deg
                            )
                            `;

                    }

                },
                {
                    passive: true
                }
            );

        }


        /* =====================================================
           7. SCROLL PARALLAX
        ===================================================== */

        const parallaxItems =
            document.querySelectorAll(
                ".visual .orb, .visual .profile-card"
            );


        if (
            parallaxItems.length
        ) {

            let ticking = false;


            window.addEventListener(
                "scroll",
                () => {

                    if (!ticking) {

                        window.requestAnimationFrame(
                            () => {

                                const scroll =
                                    window.scrollY;


                                parallaxItems
                                    .forEach(
                                        (
                                            item,
                                            index
                                        ) => {

                                            const speed =
                                                index === 0
                                                    ? 0.035
                                                    : -0.025;


                                            item.style.translate =
                                                `0 ${
                                                    scroll * speed
                                                }px`;

                                        }
                                    );


                                ticking =
                                    false;

                            }
                        );


                        ticking =
                            true;

                    }

                },
                {
                    passive: true
                }
            );

        }


        /* =====================================================
           8. STAGGER CARD REVEAL
        ===================================================== */

        document
            .querySelectorAll(
                ".grid .reveal"
            )
            .forEach(
                (
                    element,
                    index
                ) => {

                    element.style.transitionDelay =
                        `${Math.min(
                            index * 70,
                            420
                        )}ms`;

                }
            );


        /* =====================================================
           9. CONTACT FORM
        ===================================================== */

        const contactForm =
            document.getElementById(
                "contactForm"
            );


        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const nameInput =
                        document.getElementById(
                            "name"
                        );


                    const name =
                        nameInput
                            ? nameInput.value.trim()
                            : "";


                    if (!name) {

                        return;

                    }


                    /*
                     * Temporary front-end
                     * confirmation.
                     */

                    alert(
                        `Thank you, ${name}! ✨\n\n` +
                        `Your message form is working.`
                    );


                    contactForm.reset();

                }
            );

        }


        /* =====================================================
           10. CLOSE MENU WHEN CLICKING OUTSIDE
        ===================================================== */

        document.addEventListener(
            "click",
            event => {

                if (
                    !navMenu ||
                    !menuToggle
                ) {

                    return;

                }


                const clickedMenu =
                    navMenu.contains(
                        event.target
                    );


                const clickedButton =
                    menuToggle.contains(
                        event.target
                    );


                if (
                    !clickedMenu &&
                    !clickedButton
                ) {

                    navMenu.classList.remove(
                        "open"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.textContent =
                        "☰";

                }

            }
        );


        /* =====================================================
           11. ESCAPE CLOSES MENU
        ===================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    navMenu &&
                    menuToggle
                ) {

                    navMenu.classList.remove(
                        "open"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    menuToggle.textContent =
                        "☰";

                }

            }
        );


        /* =====================================================
           12. MAGNETIC BUTTON EFFECT
        ===================================================== */

        if (finePointer) {

            document
                .querySelectorAll(
                    ".btn"
                )
                .forEach(
                    button => {

                        button.addEventListener(
                            "pointermove",
                            event => {

                                const rect =
                                    button.getBoundingClientRect();


                                const x =
                                    event.clientX -
                                    (
                                        rect.left +
                                        rect.width / 2
                                    );


                                const y =
                                    event.clientY -
                                    (
                                        rect.top +
                                        rect.height / 2
                                    );


                                button.style.transform =
                                    `
                                    translate(
                                        ${x * 0.08}px,
                                        ${y * 0.08}px
                                    )
                                    `;

                            }
                        );


                        button.addEventListener(
                            "pointerleave",
                            () => {

                                button.style.transform =
                                    "";

                            }
                        );

                    }
                );

        }


        /* =====================================================
           13. SMOOTH INTERNAL LINKS
        ===================================================== */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        event => {

                            const targetId =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                !targetId ||
                                targetId === "#"
                            ) {

                                return;

                            }


                            const target =
                                document.querySelector(
                                    targetId
                                );


                            if (target) {

                                event.preventDefault();


                                target.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",
                                        block:
                                            "start"
                                    }
                                );

                            }

                        }
                    );

                }
            );


        /* =====================================================
           14. PAGE LOADED EFFECT
        =====
