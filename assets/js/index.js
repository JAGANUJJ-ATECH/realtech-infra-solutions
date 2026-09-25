/* =========================================================
   REALTECH INFRA SOLUTIONS
   MAIN JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       HEADER SCROLL
    ========================= */

    const header =
        document.getElementById("siteHeader");


    const updateHeader = () => {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =========================
       MOBILE MENU
    ========================= */

    const mobileToggle =
        document.getElementById("mobileMenuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileClose =
        document.getElementById("mobileMenuClose");


    const openMobileMenu = () => {

        mobileMenu.classList.add("open");

        document.body.classList.add("menu-open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    };


    const closeMobileMenu = () => {

        mobileMenu.classList.remove("open");

        document.body.classList.remove("menu-open");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    };


    mobileToggle.addEventListener(
        "click",
        openMobileMenu
    );


    mobileClose.addEventListener(
        "click",
        closeMobileMenu
    );


    /* =========================
       MOBILE SERVICES
    ========================= */

    const servicesTrigger =
        document.getElementById(
            "mobileServicesTrigger"
        );

    const servicesList =
        document.getElementById(
            "mobileServicesList"
        );


    servicesTrigger.addEventListener(
        "click",
        () => {

            servicesTrigger.classList.toggle("active");

            servicesList.classList.toggle("open");

        }
    );


    /* =========================
       CLOSE MOBILE LINKS
    ========================= */

    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("open")
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =========================
       SCROLL PROGRESS
    ========================= */

    const progress =
        document.getElementById(
            "scrollProgress"
        );


    const updateProgress = () => {

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;


        progress.style.width =
            `${percentage}%`;

    };


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();


    /* =========================
       REVEAL ON SCROLL
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =========================
       COUNTERS
    ========================= */

    const counters =
        document.querySelectorAll(".counter");


    let countersStarted = false;


    const runCounters = () => {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            let current = 0;

            const duration = 1800;

            const startTime =
                performance.now();


            const animate = time => {

                const progress =
                    Math.min(
                        (time - startTime) /
                        duration,
                        1
                    );


                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                current =
                    Math.floor(
                        target * eased
                    );


                counter.textContent =
                    current;


                if (progress < 1) {

                    requestAnimationFrame(
                        animate
                    );

                } else {

                    counter.textContent =
                        target;

                }

            };


            requestAnimationFrame(
                animate
            );

        });

    };


    const statsSection =
        document.querySelector(
            ".stats-section"
        );


    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        runCounters();

                        statsObserver.disconnect();

                    }

                },
                {
                    threshold: .35
                }
            );


        statsObserver.observe(
            statsSection
        );

    }


    /* =========================
       FAQ
    ========================= */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const button =
            item.querySelector(
                ".faq-question"
            );


        button.addEventListener(
            "click",
            () => {

                faqItems.forEach(
                    otherItem => {

                        if (
                            otherItem !== item
                        ) {

                            otherItem.classList.remove(
                                "active"
                            );

                        }

                    }
                );


                item.classList.toggle(
                    "active"
                );

            }
        );

    });


    /* =========================
       TESTIMONIAL SLIDER
    ========================= */

    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );


    const testimonialPrev =
        document.getElementById(
            "testimonialPrev"
        );


    const testimonialNext =
        document.getElementById(
            "testimonialNext"
        );


    const testimonialCounter =
        document.getElementById(
            "testimonialCounter"
        );


    let testimonialIndex = 0;


    const showTestimonial = index => {

        testimonials.forEach(
            testimonial => {

                testimonial.classList.remove(
                    "active"
                );

            }
        );


        testimonials[index].classList.add(
            "active"
        );


        testimonialCounter.textContent =
            `${String(index + 1).padStart(2, "0")} / ${String(testimonials.length).padStart(2, "0")}`;

    };


    testimonialNext.addEventListener(
        "click",
        () => {

            testimonialIndex++;

            if (
                testimonialIndex >=
                testimonials.length
            ) {

                testimonialIndex = 0;

            }


            showTestimonial(
                testimonialIndex
            );

        }
    );


    testimonialPrev.addEventListener(
        "click",
        () => {

            testimonialIndex--;

            if (testimonialIndex < 0) {

                testimonialIndex =
                    testimonials.length - 1;

            }


            showTestimonial(
                testimonialIndex
            );

        }
    );


    /* =========================
       AUTO TESTIMONIAL
    ========================= */

    setInterval(() => {

        testimonialIndex++;

        if (
            testimonialIndex >=
            testimonials.length
        ) {

            testimonialIndex = 0;

        }


        showTestimonial(
            testimonialIndex
        );

    }, 7000);


    /* =========================
       BACK TO TOP
    ========================= */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =========================
       CUSTOM CURSOR
    ========================= */

    const cursorDot =
        document.querySelector(
            ".cursor-dot"
        );


    const cursorRing =
        document.querySelector(
            ".cursor-ring"
        );


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        const animateCursor = () => {

            ringX +=
                (mouseX - ringX) *
                .15;

            ringY +=
                (mouseY - ringY) *
                .15;


            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;


            requestAnimationFrame(
                animateCursor
            );

        };


        animateCursor();


        document
            .querySelectorAll(
                "a, button, .project-card, .service-card"
            )
            .forEach(element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        document.body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        document.body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            });

    }


    /* =========================
       HERO PARALLAX
    ========================= */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (heroImage) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY < window.innerHeight) {

                    heroImage.style.transform =
                        `translateY(${window.scrollY * .15}px) scale(1.02)`;

                }

            },
            { passive: true }
        );

    }


    /* =========================
       PROJECT TILT
    ========================= */

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        document
            .querySelectorAll(
                ".project-card"
            )
            .forEach(card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const rotateX =
                            ((y / rect.height) -
                                .5) * -2;


                        const rotateY =
                            ((x / rect.width) -
                                .5) * 2;


                        card.style.transform =
                            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    const updateActiveNav = () => {

        let current =
            "home";


        sections.forEach(section => {

            const top =
                section.offsetTop -
                180;


            if (
                window.scrollY >= top
            ) {

                current =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href === `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    /* =========================
       YEAR
    ========================= */

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


});