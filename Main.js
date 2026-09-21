let currentPage = 0;

let pages = [];
let pageNumber = null;
let prevBtn = null;
let nextBtn = null;
let openingScreen = null;
let bgMusic = null;
let musicToggle = null;

let particleInterval = null;
let chapter3Interval = null;


/* ================================
   INITIALIZE
================================ */

function initializeBook() {

    pages = document.querySelectorAll(".page");

    pageNumber =
        document.getElementById("pageNumber");

    prevBtn =
        document.getElementById("prevBtn");

    nextBtn =
        document.getElementById("nextBtn");

    openingScreen =
        document.getElementById("openingScreen");

    bgMusic =
        document.getElementById("bgMusic");

    musicToggle =
        document.getElementById("musicToggle");


    /* Show first page behind opening screen */

    if (pages.length > 0) {

        pages.forEach((page) => {
            page.classList.remove("active");
        });

        pages[0].classList.add("active");

        currentPage = 0;

    }

    updateNavigation();

}


/* ================================
   OPEN BOOK
================================ */

function openBook() {

    console.log("Open Book button clicked");


    /* Hide opening screen */

    if (openingScreen) {

        openingScreen.classList.add("hidden");

    }


    /* Make absolutely sure Page 1 appears */

    if (pages.length > 0) {

        pages.forEach((page) => {

            page.classList.remove("active");

        });

        pages[0].classList.add("active");

        currentPage = 0;

        updateNavigation();

    }


    /* Start music */

    if (bgMusic) {

        bgMusic.volume = 0.35;

        bgMusic.play()
            .then(() => {

                if (musicToggle) {

                    musicToggle.classList.add(
                        "playing"
                    );

                    musicToggle.textContent =
                        "🎵";

                }

            })
            .catch(() => {

                console.log(
                    "Music needs user interaction."
                );

            });

    }


    /* Start floating effects */

    setTimeout(() => {

        createHearts();

        startFloatingParticles();

    }, 700);

}


/* ================================
   SHOW PAGE
================================ */

function showPage(index) {

    if (
        !pages ||
        pages.length === 0
    ) {

        return;

    }


    if (
        index < 0 ||
        index >= pages.length
    ) {

        return;

    }


    const oldPage =
        pages[currentPage];

    const newPage =
        pages[index];


    if (oldPage === newPage) {

        newPage.classList.add("active");

        currentPage = index;

        updateNavigation();

        return;

    }


    /* Hide old page */

    if (oldPage) {

        oldPage.classList.remove(
            "active"
        );

    }


    /* Show new page */

    setTimeout(() => {

        newPage.classList.add(
            "active"
        );

        currentPage = index;

        updateNavigation();


        /* Chapter 3 */

        if (
            newPage.querySelector(
                ".photo-grid"
            )
        ) {

            startChapter3Slideshow();

        }


        /* Final page */

        if (
            index ===
            pages.length - 1
        ) {

            setTimeout(() => {

                createHeartExplosion();

                if (
                    typeof createFinalPetals ===
                    "function"
                ) {

                    createFinalPetals();

                }

            }, 800);

        }


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }, 450);

}


/* ================================
   NEXT PAGE
================================ */

function nextPage() {

    if (
        currentPage <
        pages.length - 1
    ) {

        showPage(
            currentPage + 1
        );

    } else {

        createHeartExplosion();

    }

}


/* ================================
   PREVIOUS PAGE
================================ */

function previousPage() {

    if (currentPage > 0) {

        showPage(
            currentPage - 1
        );

    }

}


/* ================================
   NAVIGATION
================================ */

function updateNavigation() {

    if (pageNumber) {

        pageNumber.textContent =
            `${currentPage + 1} / ${pages.length}`;

    }


    if (prevBtn) {

        prevBtn.disabled =
            currentPage === 0;

    }


    if (nextBtn) {

        nextBtn.disabled =
            currentPage ===
            pages.length - 1;

    }

}


/* ================================
   KEYBOARD CONTROLS
================================ */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {

            nextPage();

        }

        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


/* ================================
   SWIPE CONTROLS
================================ */

let touchStartX = 0;
let touchEndX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


document.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    }
);


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    if (
        Math.abs(distance) < 60
    ) {

        return;

    }


    if (distance < 0) {

        nextPage();

    } else {

        previousPage();

    }

}


/* ================================
   FLOATING HEARTS
================================ */

function createHearts() {

    const heartCount = 18;


    for (
        let i = 0;
        i < heartCount;
        i++
    ) {

        setTimeout(() => {

            const heart =
                document.createElement("div");


            heart.innerHTML =
                Math.random() > 0.5
                    ? "♥"
                    : "♡";


            heart.style.position =
                "fixed";

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.bottom =
                "-30px";

            heart.style.fontSize =
                Math.random() * 15 + 10 + "px";

            heart.style.color =
                Math.random() > 0.5
                    ? "#b76e79"
                    : "#681f32";

            heart.style.opacity =
                "0.7";

            heart.style.pointerEvents =
                "none";

            heart.style.zIndex =
                "999";

            heart.style.transition =
                "transform 5s linear, opacity 5s linear";


            document.body.appendChild(
                heart
            );


            setTimeout(() => {

                heart.style.transform =
                    `translateY(-${window.innerHeight + 100}px)`;

                heart.style.opacity =
                    "0";

            }, 100);


            setTimeout(() => {

                heart.remove();

            }, 5200);

        }, i * 250);

    }

}


/* ================================
   FLOATING PARTICLES
================================ */

function startFloatingParticles() {

    if (particleInterval) {

        return;

    }


    particleInterval =
        setInterval(
            createFloatingParticle,
            900
        );

}


function createFloatingParticle() {

    const particle =
        document.createElement("div");


    const particles = [
        "♡",
        "♥",
        "✿",
        "❀",
        "·"
    ];


    particle.innerHTML =
        particles[
            Math.floor(
                Math.random() *
                particles.length
            )
        ];


    particle.classList.add(
        "floating-particle"
    );


    particle.style.left =
        Math.random() * 100 + "vw";

    particle.style.bottom =
        "-30px";

    particle.style.fontSize =
        Math.random() * 18 + 10 + "px";

    particle.style.color =
        Math.random() > 0.5
            ? "#b76e79"
            : "#d9a0a8";

    particle.style.animationDuration =
        Math.random() * 4 + 5 + "s";


    document.body.appendChild(
        particle
    );


    setTimeout(() => {

        particle.remove();

    }, 10000);

}


/* ================================
   HEART EXPLOSION
================================ */

function createHeartExplosion() {

    const hearts = 22;


    for (
        let i = 0;
        i < hearts;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.innerHTML =
            Math.random() > 0.5
                ? "♥"
                : "♡";


        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.fontSize =
            Math.random() * 20 + 12 + "px";

        heart.style.color =
            Math.random() > 0.5
                ? "#b76e79"
                : "#681f32";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "2000";


        document.body.appendChild(
            heart
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            Math.random() * 180 + 80;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        ) scale(1.2)`,

                    opacity: 0
                }
            ],
            {
                duration: 1800,

                easing:
                    "cubic-bezier(.17,.67,.35,1)"
            }
        );


        setTimeout(() => {

            heart.remove();

        }, 1900);

    }

}


/* ================================
   REPLAY STORY
================================ */

function replayStory() {

    currentPage = 0;


    pages.forEach((page) => {

        page.classList.remove(
            "active"
        );

    });


    if (pages[0]) {

        pages[0].classList.add(
            "active"
        );

    }


    updateNavigation();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    createHearts();

}


/* ================================
   TEDDY PAGE TURN
================================ */

function teddyTurnPage(button) {

    if (
        currentPage >=
        pages.length - 1
    ) {

        return;

    }


    if (button) {

        button.classList.add(
            "teddy-happy"
        );

    }


    if (button) {

        const rect =
            button.getBoundingClientRect();


        for (
            let i = 0;
            i < 6;
            i++
        ) {

            const heart =
                document.createElement("div");


            heart.className =
                "teddy-heart";


            heart.innerHTML =
                Math.random() > 0.5
                    ? "❤️"
                    : "💕";


            heart.style.left =
                rect.left +
                rect.width / 2 +
                "px";


            heart.style.top =
                rect.top +
                20 +
                "px";


            heart.style.setProperty(
                "--x",
                (Math.random() * 100 - 50) +
                "px"
            );


            heart.style.setProperty(
                "--y",
                (-Math.random() * 90 - 30) +
                "px"
            );


            document.body.appendChild(
                heart
            );


            setTimeout(() => {

                heart.remove();

            }, 1000);

        }

    }


    setTimeout(() => {

        if (button) {

            button.classList.remove(
                "teddy-happy"
            );

        }

        nextPage();

    }, 550);

}


/* ================================
   BIRTHDAY LOCK
================================ */

function unlockBook() {

    const day =
        document.getElementById(
            "birthDay"
        );

    const month =
        document.getElementById(
            "birthMonth"
        );

    const year =
        document.getElementById(
            "birthYear"
        );

    const error =
        document.getElementById(
            "lockError"
        );

    const lock =
        document.getElementById(
            "birthdayLock"
        );


    if (
        !day ||
        !month ||
        !year ||
        !lock
    ) {

        return;

    }


    if (

        Number(day.value) === 22 &&

        Number(month.value) === 9 &&

        Number(year.value) === 2010

    ) {

        if (error) {

            error.textContent = "";

        }


        lock.classList.add(
            "unlocking"
        );


        setTimeout(() => {

            lock.style.display =
                "none";

        }, 800);


    } else {

        if (error) {

            error.textContent =
                "Hmm... that's not the birthday I'm looking for. ❤️";

        }


        lock.classList.remove(
            "wrong"
        );


        void lock.offsetWidth;


        lock.classList.add(
            "wrong"
        );

    }

}


/* ================================
   RESTART ENTIRE BOOK
================================ */

function restartBook() {

    currentPage = 0;


    /* Stop Chapter 3 */

    if (chapter3Interval) {

        clearInterval(
            chapter3Interval
        );

        chapter3Interval = null;

    }


    /* Hide all pages */

    pages.forEach((page) => {

        page.classList.remove(
            "active"
        );

    });


    /* Reset photos */

    const cards =
        document.querySelectorAll(
            ".photo-grid .photo-card"
        );


    cards.forEach((card) => {

        card.classList.remove(
            "show-photo"
        );

    });


    /* Reset memory message */

    const memoryMessage =
        document.querySelector(
            ".memory-message"
        );


    if (memoryMessage) {

        memoryMessage.classList.remove(
            "show-message"
        );

    }


    /* Reset opening screen */

    if (openingScreen) {

        openingScreen.classList.remove(
            "hidden"
        );

    }


    /* Reset birthday lock */

    const lock =
        document.getElementById(
            "birthdayLock"
        );


    if (lock) {

        lock.style.display =
            "flex";

        lock.classList.remove(
            "unlocking"
        );

        lock.classList.remove(
            "wrong"
        );

    }


    /* Clear birthday fields */

    const day =
        document.getElementById(
            "birthDay"
        );

    const month =
        document.getElementById(
            "birthMonth"
        );

    const year =
        document.getElementById(
            "birthYear"
        );

    const error =
        document.getElementById(
            "lockError"
        );


    if (day) day.value = "";

    if (month) month.value = "";

    if (year) year.value = "";

    if (error) error.textContent = "";


    /* Show first page again */

    if (pages[0]) {

        pages[0].classList.add(
            "active"
        );

    }


    updateNavigation();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ================================
   MUSIC TOGGLE
================================ */

function toggleMusic() {

    if (!bgMusic) {

        return;

    }


    if (bgMusic.paused) {

        bgMusic.play()
            .then(() => {

                if (musicToggle) {

                    musicToggle.classList.add(
                        "playing"
                    );

                    musicToggle.textContent =
                        "🎵";

                }

            })
            .catch(() => {});


    } else {

        bgMusic.pause();


        if (musicToggle) {

            musicToggle.classList.remove(
                "playing"
            );

            musicToggle.textContent =
                "🔇";

        }

    }

}


/* ================================
   CHAPTER 3 MEMORY REVEAL
================================ */

function startChapter3Slideshow() {

    const cards =
        document.querySelectorAll(
            ".photo-grid .photo-card"
        );


    if (!cards.length) {

        return;

    }


    if (chapter3Interval) {

        clearInterval(
            chapter3Interval
        );

        chapter3Interval = null;

    }


    /* Reset cards */

    cards.forEach((card) => {

        card.classList.remove(
            "show-photo"
        );

    });


    /* Reset message */

    const message =
        document.querySelector(
            ".memory-message"
        );


    if (message) {

        message.classList.remove(
            "show-message"
        );

    }


    let currentPhoto = 0;


    /* First card */

    cards[0].classList.add(
        "show-photo"
    );


    currentPhoto = 1;


    /* Remaining cards */

    chapter3Interval =
        setInterval(() => {

            if (
                currentPhoto >=
                cards.length
            ) {

                clearInterval(
                    chapter3Interval
                );

                chapter3Interval = null;


                /* Show message after fifth card */

                setTimeout(() => {

                    const memoryMessage =
                        document.querySelector(
                            ".memory-message"
                        );


                    if (memoryMessage) {

                        memoryMessage.classList.add(
                            "show-message"
                        );

                    }

                }, 1000);


                return;

            }


            cards[currentPhoto]
                .classList.add(
                    "show-photo"
                );


            currentPhoto++;

        }, 2500);

}


/* ================================
   START AFTER HTML LOADS
================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeBook();

    }
);
