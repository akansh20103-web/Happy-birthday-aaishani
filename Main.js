alert("Hime's JavaScript is working ❤️");
let currentPage = 0;

const pages = document.querySelectorAll(".page");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const openingScreen = document.getElementById("openingScreen");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let particleInterval;
let chapter3Interval = null;


/* ================================
   OPEN BOOK
================================ */

function openBook() {

    openingScreen.classList.add("hidden");

    /* Start background music */

    if (bgMusic) {

        bgMusic.volume = 0.35;

        bgMusic.play()
            .then(() => {

                if (musicToggle) {
                    musicToggle.classList.add("playing");
                    musicToggle.textContent = "🎵";
                }

            })
            .catch(() => {

                console.log("Music needs user interaction.");

            });

    }

    setTimeout(() => {

        createHearts();
        startFloatingParticles();

    }, 700);

}


/* ================================
   SHOW PAGE
================================ */

function showPage(index) {

    if (index < 0 || index >= pages.length) {
        return;
    }

    const oldPage = pages[currentPage];
    const newPage = pages[index];


    /* First page — show immediately */

    if (
        currentPage === index &&
        !newPage.classList.contains("active")
    ) {

        newPage.classList.add("active");

        currentPage = index;

        updateNavigation();

        return;
    }


    if (oldPage === newPage) {
        return;
    }


    /* Fade out old page */

    if (oldPage) {
        oldPage.classList.remove("active");
    }


    /* Fade in new page */

    setTimeout(() => {

        newPage.classList.add("active");

        currentPage = index;

        updateNavigation();


        /* ================================
           CHAPTER 3 PHOTO REVEAL
        ================================= */

        if (newPage.querySelector(".photo-grid")) {

            startChapter3Slideshow();

        }


        /* ================================
           FINAL PAGE EFFECTS
        ================================= */

        if (index === pages.length - 1) {

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

    if (currentPage < pages.length - 1) {

        showPage(currentPage + 1);

    } else {

        createHeartExplosion();

    }

}


/* ================================
   PREVIOUS PAGE
================================ */

function previousPage() {

    if (currentPage > 0) {

        showPage(currentPage - 1);

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
            currentPage === pages.length - 1;

    }

}


/* ================================
   KEYBOARD CONTROLS
================================ */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextPage();

    }

    if (event.key === "ArrowLeft") {

        previousPage();

    }

});


/* ================================
   SWIPE CONTROLS
================================ */

let touchStartX = 0;
let touchEndX = 0;


document.addEventListener("touchstart", (event) => {

    touchStartX =
        event.changedTouches[0].screenX;

});


document.addEventListener("touchend", (event) => {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;

    if (Math.abs(distance) < 60) {

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

    for (let i = 0; i < heartCount; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.innerHTML =
                Math.random() > 0.5
                    ? "♥"
                    : "♡";

            heart.style.position = "fixed";

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.bottom = "-30px";

            heart.style.fontSize =
                Math.random() * 15 + 10 + "px";

            heart.style.color =
                Math.random() > 0.5
                    ? "#b76e79"
                    : "#681f32";

            heart.style.opacity = "0.7";

            heart.style.pointerEvents = "none";

            heart.style.zIndex = "999";

            heart.style.transition =
                "transform 5s linear, opacity 5s linear";


            document.body.appendChild(heart);


            setTimeout(() => {

                heart.style.transform =
                    `translateY(-${window.innerHeight + 100}px)`;

                heart.style.opacity = "0";

            }, 100);


            setTimeout(() => {

                heart.remove();

            }, 5200);

        }, i * 250);

    }

}


/* ================================
   FLOATING ROSE PETALS + HEARTS
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


    document.body.appendChild(particle);


    setTimeout(() => {

        particle.remove();

    }, 10000);

}


/* ================================
   FINAL HEART EXPLOSION
================================ */

function createHeartExplosion() {

    const hearts = 22;

    for (let i = 0; i < hearts; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML =
            Math.random() > 0.5
                ? "♥"
                : "♡";

        heart.style.position = "fixed";

        heart.style.left = "50%";

        heart.style.top = "50%";

        heart.style.fontSize =
            Math.random() * 20 + 12 + "px";

        heart.style.color =
            Math.random() > 0.5
                ? "#b76e79"
                : "#681f32";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "2000";


        document.body.appendChild(heart);


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 180 + 80;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


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

        }, 1300);

    }

}


/* ================================
   START
================================ */

showPage(0);


/* ================================
   REPLAY STORY
================================ */

function replayStory() {

    currentPage = 0;

    showPage(0);

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

    if (currentPage >= pages.length - 1) {

        return;

    }


    /* Teddy happy animation */

    button.classList.add(
        "teddy-happy"
    );


    /* Create little hearts */

    const rect =
        button.getBoundingClientRect();


    for (let i = 0; i < 6; i++) {

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


    /* Wait for teddy animation */

    setTimeout(() => {

        button.classList.remove(
            "teddy-happy"
        );

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
        ).value;

    const month =
        document.getElementById(
            "birthMonth"
        ).value;

    const year =
        document.getElementById(
            "birthYear"
        ).value;

    const error =
        document.getElementById(
            "lockError"
        );

    const lock =
        document.getElementById(
            "birthdayLock"
        );


    if (

        Number(day) === 22 &&

        Number(month) === 9 &&

        Number(year) === 2010

    ) {

        error.textContent = "";

        lock.classList.add(
            "unlocking"
        );


        setTimeout(() => {

            lock.style.display =
                "none";

        }, 1000);


    } else {

        error.textContent =
            "Hmm... that's not the birthday I'm looking for. ❤️";


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

    /* Reset page */

    currentPage = 0;


    /* Stop Chapter 3 animation */

    if (chapter3Interval) {

        clearInterval(
            chapter3Interval
        );

        chapter3Interval = null;

    }


    /* Hide every page */

    pages.forEach((page) => {

        page.classList.remove(
            "active"
        );

    });


    /* Reset Chapter 3 photos */

    const cards =
        document.querySelectorAll(
            ".photo-grid .photo-card"
        );


    cards.forEach((card) => {

        card.classList.remove(
            "show-photo"
        );

    });


    /* Reset opening screen */

    openingScreen.classList.remove(
        "hidden"
    );


    /* Show birthday lock again */

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


    /* Clear birthday inputs */

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


    if (day) {

        day.value = "";

    }

    if (month) {

        month.value = "";

    }

    if (year) {

        year.value = "";

    }

    if (error) {

        error.textContent = "";

    }


    /* Scroll to top */

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

        bgMusic.play();

        if (musicToggle) {

            musicToggle.classList.add(
                "playing"
            );

            musicToggle.textContent =
                "🎵";

        }


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
   CHAPTER 3 MEMORY PHOTO REVEAL
================================ */

function startChapter3Slideshow() {

    const cards =
        document.querySelectorAll(
            ".photo-grid .photo-card"
        );


    if (!cards.length) {

        return;

    }


    /* Stop previous animation */

    if (chapter3Interval) {

        clearInterval(
            chapter3Interval
        );

    }


    /* Reset all photos */

    cards.forEach((card) => {

        card.classList.remove(
            "show-photo"
        );

    });


    let currentPhoto = 0;


    /* First photo appears */

    cards[0].classList.add(
        "show-photo"
    );


    currentPhoto = 1;


    /* Reveal next photo */

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

                return;

            }


            cards[currentPhoto]
                .classList.add(
                    "show-photo"
                );


            currentPhoto++;


        }, 2500);

}
