document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------
       MOBILE NAVIGATION
    -------------------------------- */

    const toggle =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".nav-links");


    if (toggle && menu) {

        toggle.addEventListener("click", () => {

            const isOpen =
                menu.classList.toggle("open");

            toggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        menu.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        menu.classList.remove(
                            "open"
                        );

                        toggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* --------------------------------
       ACTIVE NAVIGATION LINK
    -------------------------------- */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            const target =
                link.getAttribute("href");


            if (
                target === currentPage ||
                (
                    currentPage === "" &&
                    target === "index.html"
                )
            ) {

                link.classList.add("active");

            }

        });


    /* --------------------------------
       SCROLL REVEAL ANIMATION
    -------------------------------- */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* --------------------------------
       AUTOMATIC COPYRIGHT YEAR
    -------------------------------- */

    const yearElement =
        document.querySelector(
            "[data-year]"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* --------------------------------
       DESKTOP 3D CARD TILT
    -------------------------------- */

    const tiltCards =
        document.querySelectorAll(
            "[data-tilt]"
        );


    tiltCards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

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
                    ) / rect.width - 0.5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) / rect.height - 0.5;


                const rotateX =
                    y * -4;


                const rotateY =
                    x * 4;


                card.style.transform =
                    `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* --------------------------------
       CONTACT FORM
    -------------------------------- */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                if (!name) {
                    return;
                }


                alert(
                    `Thank you, ${name}! ` +
                    `Your message form is working.`
                );


                contactForm.reset();

            }
        );

    }


    /* --------------------------------
       CLOSE MOBILE MENU ON OUTSIDE CLICK
    -------------------------------- */

    document.addEventListener(
        "click",
        event => {

            if (!menu || !toggle) {
                return;
            }


            const clickedInsideMenu =
                menu.contains(event.target);


            const clickedToggle =
                toggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                menu.classList.remove(
                    "open"
                );

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* --------------------------------
       ESCAPE KEY CLOSES MENU
    -------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                menu &&
                toggle
            ) {

                menu.classList.remove(
                    "open"
                );

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});
