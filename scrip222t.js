const header = document.querySelector(".header");
const specialistCards = document.querySelectorAll(".specialist-card");
const specialistDots = document.querySelectorAll(".specialists__dot");
const specialistLeftButton = document.querySelector(".specialists__arrow--left");
const specialistRightButton = document.querySelector(".specialists__arrow--right");
const articleCards = document.querySelectorAll(".article-card");
const articleLeftButton = document.querySelector(".articles__arrow--left");
const articleRightButton = document.querySelector(".articles__arrow--right");
const hero = document.querySelector(".hero");
const heroLabel = document.querySelector(".hero__label");
const heroTitle = document.querySelector(".hero__title");
const heroSubtitle = document.querySelector(".hero__subtitle");
const heroDots = document.querySelectorAll(".hero__dot");
const heroLeftButton = document.querySelector(".hero__arrow--left");
const heroRightButton = document.querySelector(".hero__arrow--right");

let isCompact = false;
let activeSpecialistIndex = 2;
let activeArticleIndex = 2;
let scrollTicking = false;
let activeHeroIndex = 0;
let heroTimer = null;

const heroSlides = [
    {
        label: "Общая информация",
        title: "ЛАВЕТ.РФ",
        subtitle: "Качественно лечим<br>ваших маленьких<br>друзей с 1997 года!",
        image: "images/hero.jpg"
    },
    {
        label: "Мы переехали!",
        title: "Новый адрес",
        subtitle: "Ждём вас по адресу:<br>Воронеж, улица 20-летия Октября, 105/1",
        image: "images/bg-2.jpg"
    },
    {
        label: "Новый сайт",
        title: "ЛАВЕТ.РФ",
        subtitle: "Мы переехали с lavet.su<br>на новый удобный адрес:<br>лавет.рф",
        image: "images/bg-3.jpg"
    }
];

function setHeaderState() {
    if (!header) {
        return;
    }

    if (window.innerWidth <= 1100) {
        header.classList.remove("header--compact");
        isCompact = false;
        return;
    }

    const nado_svernut = window.scrollY > 180;

    if (nado_svernut !== isCompact) {
        isCompact = nado_svernut;
        header.classList.toggle("header--compact", isCompact);
    }
}

function onScroll() {
    if (scrollTicking) {
        return;
    }

    scrollTicking = true;

    window.requestAnimationFrame(() => {
        setHeaderState();
        scrollTicking = false;
    });
}

function getRelativeIndex(index, activeIndex, length) {
    let razn = index - activeIndex;

    if (razn > length / 2) {
        razn -= length;
    }

    if (razn < -length / 2) {
        razn += length;
    }

    return razn;
}

function updateSpecialists() {
    specialistCards.forEach((card, index) => {
        card.classList.remove(
            "is-center",
            "is-left-1",
            "is-left-2",
            "is-right-1",
            "is-right-2"
        );

        const razn = getRelativeIndex(index, activeSpecialistIndex, specialistCards.length);

        if (razn === 0) {
            card.classList.add("is-center");
        }

        if (razn === -1) {
            card.classList.add("is-left-1");
        }

        if (razn === -2) {
            card.classList.add("is-left-2");
        }

        if (razn === 1) {
            card.classList.add("is-right-1");
        }

        if (razn === 2) {
            card.classList.add("is-right-2");
        }
    });

    specialistDots.forEach((dot, index) => {
        dot.classList.toggle("specialists__dot--active", index === activeSpecialistIndex);
    });
}

function getCircleIndex(index, length) {
    return (index + length) % length;
}


function updateHeroSlide(index) {
    if (!hero || !heroTitle || !heroSubtitle || !heroLabel || !heroSlides.length) {
        return;
    }

    activeHeroIndex = getCircleIndex(index, heroSlides.length);
    const slide = heroSlides[activeHeroIndex];

    hero.classList.add("is-changing");

    window.setTimeout(() => {
        heroLabel.textContent = slide.label;
        heroTitle.textContent = slide.title;
        heroSubtitle.innerHTML = slide.subtitle;
        hero.style.backgroundImage = `url("${slide.image}")`;

        heroDots.forEach((dot, dotIndex) => {
            dot.classList.toggle("hero__dot--active", dotIndex === activeHeroIndex);
        });

        hero.classList.remove("is-changing");
    }, 220);
}

function startHeroSlider() {
    window.clearInterval(heroTimer);

    heroTimer = window.setInterval(() => {
        updateHeroSlide(activeHeroIndex + 1);
    }, 5000);
}

function goToHeroSlide(index) {
    updateHeroSlide(index);
    startHeroSlider();
}

function updateArticles() {
    articleCards.forEach((card) => {
        card.classList.remove(
            "is-active",
            "is-prev-1",
            "is-prev-2",
            "is-next-1",
            "is-next-2"
        );
    });

    const dlina = articleCards.length;

    articleCards[getCircleIndex(activeArticleIndex, dlina)].classList.add("is-active");
    articleCards[getCircleIndex(activeArticleIndex - 1, dlina)].classList.add("is-prev-1");
    articleCards[getCircleIndex(activeArticleIndex - 2, dlina)].classList.add("is-prev-2");
    articleCards[getCircleIndex(activeArticleIndex + 1, dlina)].classList.add("is-next-1");
    articleCards[getCircleIndex(activeArticleIndex + 2, dlina)].classList.add("is-next-2");
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", setHeaderState);

if (specialistLeftButton && specialistRightButton) {
    specialistLeftButton.addEventListener("click", () => {
        activeSpecialistIndex -= 1;

        if (activeSpecialistIndex < 0) {
            activeSpecialistIndex = specialistCards.length - 1;
        }

        updateSpecialists();
    });

    specialistRightButton.addEventListener("click", () => {
        activeSpecialistIndex += 1;

        if (activeSpecialistIndex >= specialistCards.length) {
            activeSpecialistIndex = 0;
        }

        updateSpecialists();
    });

    specialistDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            activeSpecialistIndex = index;
            updateSpecialists();
        });
    });
}

if (articleLeftButton && articleRightButton) {
    articleLeftButton.addEventListener("click", () => {
        activeArticleIndex -= 1;
        updateArticles();
    });

    articleRightButton.addEventListener("click", () => {
        activeArticleIndex += 1;
        updateArticles();
    });
}


if (heroLeftButton && heroRightButton) {
    heroLeftButton.addEventListener("click", () => {
        goToHeroSlide(activeHeroIndex - 1);
    });

    heroRightButton.addEventListener("click", () => {
        goToHeroSlide(activeHeroIndex + 1);
    });

    heroDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToHeroSlide(index);
        });
    });
}

setHeaderState();
updateHeroSlide(0);
startHeroSlider();
updateSpecialists();
updateArticles();